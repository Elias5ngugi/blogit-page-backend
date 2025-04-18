import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import { prisma } from '../Prisma/client'; 


export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, 
        firstName,
        lastName,
        username,
      },
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: 'Error creating user', details: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        '1234', 
        { expiresIn: '1h' } 
      );
      res.status(200).json({ message: 'Login successful', token }); 
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error logging in', details: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};


export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error fetching user', details: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
