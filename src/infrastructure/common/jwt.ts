import { jwtDecode } from 'jwt-decode';

// TODO: we need to update types according to cognito token

type JwtPayload = {
  sub: string;
  exp: number;
};

export function parseJwt(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
}
