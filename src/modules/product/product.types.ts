import { Document } from 'mongoose';

// Interface for the product document
export interface IProduct extends Document {
  id: string; // For UUID compatibility
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  images: IImage[];
  stock: number;
  totalSold: number;
  category: string;
  tags: string[];
  features: string[];
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// Image subdocument interface
export interface IImage {
  url: string;
  alt: string;
}
