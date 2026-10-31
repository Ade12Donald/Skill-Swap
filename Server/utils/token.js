import jwt from "jsonwebtoken";

export const JWTsign = (user, res) => {
  const token = jwt.sign(
    { ID: user._id.toString() }, // _id always exists; toString() makes it a clean string
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });
};
