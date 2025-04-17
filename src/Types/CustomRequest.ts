import { Request } from 'express';


interface User {
  id: number;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}


export interface CustomRequest extends Request {
  user?: User; 
}
