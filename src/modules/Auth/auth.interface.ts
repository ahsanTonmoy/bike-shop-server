export const USER_ROLE = {
  // user: 'user',
  admin: "admin",
  customer: "customer",
} as const;
export type TTokenResponse = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};
