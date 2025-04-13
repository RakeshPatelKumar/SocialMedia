import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "User does not have token" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // console.log(verifyToken); 

        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Auth middleware error", error: error.message });
    }
};

export default isAuth;
