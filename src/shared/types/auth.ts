export type AuthResponse = {
  accessToken: string;
};

export type JwtPayload = {
  iat?: number;

  exp?: number;

  username: string;

  sub: string;

  discriminator: string;
};
