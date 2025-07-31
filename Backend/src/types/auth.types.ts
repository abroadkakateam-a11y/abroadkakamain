export interface JwtPayload {
  id: string;
  role: string;
  email?: string;  // Make optional if it might not always exist
}