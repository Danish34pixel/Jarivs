import jwt from "jsonwebtoken";

const genToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "365d", // Extended to 1 year
  });
};

export default genToken;
