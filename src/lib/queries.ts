"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";
import { Role, User } from "@prisma/client";

/**
 * Fetches details of the currently authenticated user from the database.
 * Returns user data including associated agency, sidebar options, subaccounts, and permissions.
 */
export const getAuthUserDetails = async () => {
  const user = await currentUser(); // Fetch the current user from Clerk
  if (!user) {
    return;
  }

  // Query the database to find a unique user based on their email address
  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress, // Match user by email
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  });

  return userData; // Return user data with related Agency, SubAccount, and Permissions
};


/**
 * Saves an activity log notification for a specific agency or subaccount.
 * Parameters for saving the notification.
 * agencyId - ID of the agency related to the notification.
 * description - Description of the notification.
 * subaccountId - ID of the subaccount related to the notification (optional).
 */
export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string;
  description: string;
  subaccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;

  if (!authUser) {
    // If a user is not authenticated, find a user associated with the provided subaccount ID
    const response = await db.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: { id: subaccountId },
          },
        },
      },
    });

    if (response) {
      userData = response;// Assign found user data
    }
  } else {
    // If authenticated, find user by their email address
    userData = await db.user.findUnique({
      where: { email: authUser.emailAddresses[0].emailAddress },
    });
  }

  if (!userData) {
    console.log("Could not find a user");
  }

  let foundAgencyId = agencyId;
  if (!agencyId) {
    // If no agency ID provided, derive it from the subaccount ID
    if (!subaccountId) {
      throw new Error(
        "You need to provide at least an agency Id or subaccount id"
      );
    }

   // Query the database to find the agency ID from the subaccount ID
    const response = await db.subAccount.findUnique({
      where: { id: subaccountId },
    });
    if (response) foundAgencyId = response.agencyId;
  }

   // Create a notification based on whether a subaccount ID is provided
  if (subaccountId) {
    await db.notification.create({
      data: {
        notification: `${userData?.name} | ${description}`,
        User: { connect: { id: userData?.id } },
        Agency: { connect: { id: foundAgencyId } },
        SubAccount: { connect: { id: subaccountId } },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData?.name}| ${description}`,
        User: { connect: { id: userData?.id } },
        Agency: { connect: { id: foundAgencyId } },
      },
    });
  }
};

/**
 * Creates a new team user in the database unless the user role is 'AGENCY_OWNER'.
 * agencyId - ID of the agency associated with the new user.
 *  user - User object containing details of the new user to create.
 *  Returns the created user or null if user role is 'AGENCY_OWNER'.
 */
export const createTeamUser = async (agencyId: string, user: User) => {
  if (user.role === "AGENCY_OWNER") return null;

  const response = await db.user.create({ data: { ...user } });
  return response;
};

/**
 * Verifies and accepts an invitation for the current user.
 * Handles user creation, logging activity, updating metadata, and deleting the invitation.
 * Returns the agency ID of the user or null.
 */
export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();// Fetch the current user from Clerk
  if (!user) return redirect("/sign-in");// Redirect to sign-in page if no user found

  const invitationExists = await db.invitation.findUnique({
    where: { email: user.emailAddresses[0].emailAddress, status: "PENDING" },
  });

  if (invitationExists) {
    // Create user in database based on invitation details
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // Save activity log notification
    await saveActivityLogsNotification({
      agencyId: invitationExists?.agencyId,
      description: "Joined",
      subaccountId: undefined,// Optional: No subaccount ID for this action
    });

    if (userDetails) {
       // Update user metadata in Clerk
      await clerkClient.users.updateUserMetadata(user.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      // Delete the invitation from the database
      await db.invitation.delete({
        where: { email: userDetails.email },
      });

      return userDetails.agencyId;// Return the agency ID of the user
    } else {
      return null;
    }
  } else {
     // Fetch agency ID for the authenticated user
    const agency = await db.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return agency ? agency.agencyId : null;// Return the agency ID or null if not found
  }
};
