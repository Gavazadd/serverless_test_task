import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.json(new ApiError('Not authorized', 401))
        }
        next();
    } catch (e) {
        return res.json(new ApiError('Not authorized', 401))
    }
}