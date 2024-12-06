import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
            return; // Stop further execution
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        if (!decode || !decode.userId) {
            res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
            return; // Stop further execution
        }

        req.id = decode.userId;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return; // Stop further execution
    }
};
