import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token) {
  const decoded = jwtDecode(token);

  if (!decoded || !decoded.id) {
    throw new Error('Invalid token');
  }

  return decoded.id;
}

