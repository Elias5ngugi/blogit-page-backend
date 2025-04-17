import { Request, Response } from 'express';
import { prisma } from '../Prisma/client';
import { CustomRequest } from '../Types/CustomRequest';


export const createPost = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.id, 
      },
    });

    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('[createPost error]', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};


export const getUserPosts = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    
    const posts = await prisma.post.findMany({
      where: { authorId: req.user.id }, 
      orderBy: { createdAt: 'desc' },    
    });

    
    res.status(200).json(posts);
  } catch (error) {
    console.error('[getUserPosts error]', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};
