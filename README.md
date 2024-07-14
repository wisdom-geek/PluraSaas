This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Plura Saas

## Overview
- This project aims to develop a robust application for managing agencies, users, and permissions using modern web technologies. It leverages frameworks like Next.js for frontend development, Clerk for authentication, and Prisma for database operations, ensuring a secure and efficient user experience.

# Features
## User Authentication and Management
- Secure Authentication: Use Clerk for secure and robust user authentication.
- User Roles: Differentiate user roles including AGENCY_OWNER, SUBACCOUNT_USER, and more.
- Invitation System: Allows agencies to invite users to join their team.
- Activity Logs: Logs user activities for audit and tracking purposes.
## Agency and Subaccount Management
- Agency Data: Manage agency details including associated subaccounts and permissions.
- Subaccount Integration: Handle subaccount-specific configurations and options.
- Notifications: Track agency-specific notifications and updates.
## Miscellaneous
- Activity Logging: Save and track activity logs for various user actions within the platform.
- Responsive Design: Ensure a seamless experience across different devices and screen sizes.


# Technologies Used
- Frontend: Next.js, React, Clerk
- Backend: Node.js, Express.js, Prisma
- Database: MySQL (configured via Prisma ORM)
- Third-Party Services: Clerk for authentication, Prisma for database management

# Getting Started
## Prerequisites
- Ensure you have Node.js installed.
- Ensure you have MySQL installed and running.
- Authentication: Use Clerk to sign up and log in as a user. Upon authentication, users can access various features based on their roles and permissions.
- User Management: Admins can manage user profiles, assign roles, and monitor user activities through integrated activity logs.
- Agency Management: Create and manage agencies, associate users and subaccounts, and track agency-specific notifications and updates.



## Installation
To run this project locally, follow these steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/wisdom-geek/PluraSaas
    ```
2. Navigate to the project directory:
    ```bash
    cd plura
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. [Set up the environment variables](#environment-configuration)
6. Initialize Prisma and migrate the database schema: 
    ```bash
       npx prisma migrate dev
    ```

7. Start the development server: npm run dev
8. Access the application at: http://localhost:3000

## Enviroment Configuration 
Before running the project, you need to set up your environment variables. Follow these steps:

1. Create a .env file based on .env.example and configure necessary credentials and settings:
    ```bash
    cp .env.example .env
    ```

2. Open the `.env` file In VS code:   

    **OR** 

    ```bash
    nano .env 
    ```
3. Fill in your own configuration details. Here’s an explanation of each variable:

    ```plaintext   
    # Clerk configurations
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
    
    #Next configurations
    NEXT_PUBLIC_URL
    NEXT_PUBLIC_DOMAIN
    NEXT_PUBLIC_SCHEMA

    #Uploadthing configurations   
    UPLOADTHING_SECRET
    UPLOADTHING_APP_ID
     
    # Database configurations
    DATABASE_URL=mysql://username:password@localhost:3306/plura


## Development
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Usage
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Setting Up and Running Plura Studio
To view and manage your database using Prisma Studio, follow these steps:
1. Run Prisma Studio:
    ```bash
    npx prisma studio
    ```
2. Access Prisma Studio:
- Prisma Studio will be up and running at http://localhost:5555. Open this URL in your browser to interact with your database.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create your feature branch:
    ```bash
    git checkout -b feature-name
    ```
 
3. Commit your changes: 
    ```bash
    git commit -am 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Submit a pull request


# Support and Assistance

If you have any questions about the codebase or encounter issues while working on it, feel free to reach out for assistance. Here are some ways to get support:

- **Contact:** You can reach out [Ambrose](ambrosemusyoka254@gmail.com) for assistance or clarification on any aspect of the code.
- **Documentation:** Refer to the project's documentation for guidance on setup, usage, and troubleshooting.

- **Issue Reporting:** If you encounter bugs or unexpected behavior, please report them by opening a new issue in the [GitHub Issues](https://github.com/wisdom-geek/PluraSaas/issues) section of this repository. Provide as much detail as possible, including steps to reproduce the issue, your environment, and any relevant logs or screenshots.
We're here to help ensure a smooth experience with the codebase and to address any questions or concerns you may have.

## Contact
Created by [Ambrose](ambrosemusyoka254@gmail.com) - feel free to contact me!
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Additional Features (to be implemented)
- Dashboard: A comprehensive dashboard to monitor all activities and analytics.
- Custom Notifications: Advanced notification settings for users and admins.
- Integrations: Seamless integration with other third-party services and APIs.