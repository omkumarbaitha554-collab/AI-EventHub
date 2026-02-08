export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN || "https://eminent-sunbeam-70.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};
