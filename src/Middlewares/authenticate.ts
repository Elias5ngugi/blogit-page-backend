import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include user information
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    
    res.status(401).json({ message: 'No token provided' });
    return; 
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    
    req.user = decoded;

    
    next();
  } catch (error) {
    
    console.error('[JWT Error]', error);
    res.status(401).json({ message: 'Invalid or expired token' });
    return; 
  }
};
