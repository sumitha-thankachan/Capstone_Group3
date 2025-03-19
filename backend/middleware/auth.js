const jwt = require("jsonwebtoken");

// ✅ Middleware to authenticate Admins
const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("❌ No Token Found"); // ✅ Debugging
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Decoded Token:", decoded); // ✅ Log decoded token

    if (decoded.userType !== "Admin") {
      console.log("❌ User is not an Admin"); // ✅ Debugging
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

    req.user = decoded; // ✅ Store user info in request
    next();
  } catch (error) {
    console.log("❌ Invalid Token:", error.message); // ✅ Debugging
    return res.status(400).json({ message: "Invalid Token" });
  }
};

// ✅ Middleware to authenticate Patients & Caregivers
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // ✅ Debugging token output

    // ✅ Fix: Check `userType` instead of `role`
    if (decoded.userType !== "Patient" && decoded.userType !== "Caregiver") {
      return res.status(403).json({ message: "Access forbidden: Patients & Caregivers only" });
    }

    req.user = decoded; // ✅ Attach user details to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateAdmin, authenticateUser };
