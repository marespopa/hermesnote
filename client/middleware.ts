export { default } from "next-auth/middleware";

export const config = { matcher: ["/files", "/files/:path*", "/me"] };
