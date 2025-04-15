import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jwt
import { prisma } from '../Prisma/client'; 

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, username } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Save hashed password
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

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      // Create a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'your_secret_key', // Use a secure secret key
        { expiresIn: '1h' } // Token expiration (1 hour)
      );
      res.status(200).json({ message: 'Login successful', token }); // Send token
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

// Get user by ID
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
