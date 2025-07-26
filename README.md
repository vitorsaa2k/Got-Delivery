# Delivery management system using NextJs + TypeScript
Some of the tecnologies used:
- TailwindCSS (Styling)
- Nodemailer (Sending E-mails)
- Zod (Input Validation)
- Zustand (Client State Management)
- Shadcn (UI Library)
- Prisma (ORM)
- Next Auth (Authentication)
- TanStack Query (Server State Management)

### Database
[![database](https://skillicons.dev/icons?i=mongodb)](https://skillicons.dev)

MongoDb Atlas is being used for storing user data. Together with Prisma for type-safe database queries.

### An e-mail verification system was created from zero for this project.
Nodemailer is being used only for sending e-mails.

The verification and validation of e-mails is totally handled by the App itself.
It sends an e-mail with the verification code, and verification link to the provided e-mail by the user. (when creating an account)
