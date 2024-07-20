import AgencyDetails from '@/components/forms/agency-details'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { Plan } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({ searchParams }: { searchParams: { plan: Plan; state: string; code: string } }) => {
  // Verify and accept the invitation, then get the agency ID
  const agencyId = await verifyAndAcceptInvitation()
  console.log('Agency ID:', agencyId) // Debugging line

  // Get authenticated user details
  const user = await getAuthUserDetails()
  console.log('User details:', user) // Debugging line

  // Check if agency ID is valid
  if (agencyId) {
    console.log('Valid agency ID:', agencyId) // Debugging line
    // Redirect based on user role
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
      console.log('Redirecting to /subaccount') // Debugging line
      return redirect('/subaccount')
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      // Redirect to billing page if a plan is specified
      if (searchParams.plan) {
        console.log('Redirecting to billing page') // Debugging line
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }
      // Handle Stripe account connection
      if (searchParams.state) {
        const statePath = searchParams.state.split('___')[0]
        const stateAgencyId = searchParams.state.split('___')[1]
        if (!stateAgencyId) return <div>Not authorized</div>
        console.log('Redirecting to state path') // Debugging line
        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
      } else {
        console.log('Redirecting to agency page') // Debugging line
        return redirect(`/agency/${agencyId}`)
      }
    } else {
      return <div>Not authorized</div>
    }
  }

  // Get the current authenticated user
  const authUser = await currentUser()
  console.log('Authenticated user:', authUser) // Debugging line

  // Render the page with agency creation form
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl">Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  )
}

export default Page