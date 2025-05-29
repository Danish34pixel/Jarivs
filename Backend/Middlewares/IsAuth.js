// import jwt from "jsonwebtoken";
// const isAuth = async (req, res, next) => {
//   try {
//     // console.log("IsAuth - Request path:", req.path);
//     // console.log("IsAuth - Cookies received:", req.cookies);
//     // console.log("IsAuth - Headers:", req.headers);

//     const token = req.cookies.token;
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized - No token found" });
//     }

//     console.log("IsAuth - Token found:", token);
//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//     req.UserId = verifyToken.UserId;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
// export default isAuth;

import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Standard convention: `req.user`

    console.log("IsAuth ✅ User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("IsAuth ❌ JWT verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default isAuth;
