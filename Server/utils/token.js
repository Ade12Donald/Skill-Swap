import jwt from "jsonwebtoken";

export const JWTsign = (user, res) => {
  const token = jwt.sign({ ID: user.Id }, process.env.JWTsign, {
    expiresIn: "15m",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });
};
