import httpStatus from 'http-status';
import AppError from '../../utils/AppError.js';
import Product from './product.model.js';
import type { IProduct } from './product.types.js';

// Create a new product
export const createProduct = async (productData: IProduct) => {
  // Check if slug already exists
  const existingProduct = await Product.findOne({
    slug: productData.slug.toLowerCase(),
  });

  if (existingProduct) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Product with slug "${productData.slug}" already exists`,
    );
  }

  // Generate unique ID if not provided
  const product = await Product.create({
    ...productData,
    id: crypto.randomUUID(),
    stock: productData.stock ?? 0,
    totalSold: productData.totalSold ?? 0,
    featured: productData.featured ?? false,
    status: productData.status ?? 'draft',
    tags: productData.tags ?? [],
    features: productData.features ?? [],
  });

  // Return product without __v
  const productObject = product.toObject();
  return productObject;
};

// Get all products
export const getAllProducts = async (filters?: {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
}) => {
  const query: any = {};

  if (filters?.category) {
    query.category = filters.category;
  }

  if (filters?.status) {
    query.status = filters.status;
  }

  if (filters?.featured !== undefined) {
    query.featured = filters.featured;
  }

  if (filters?.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { slug: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();

  return products;
};

// Get single product by ID or slug
export const getProductById = async (identifier: string): Promise<any> => {
  let product;

  // Check if identifier is UUID or slug
  if (
    identifier.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    )
  ) {
    product = await Product.findOne({ id: identifier });
  } else {
    product = await Product.findOne({ slug: identifier });
  }

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return product.toObject();
};

// Update product
export const updateProduct = async (
  id: string,
  updateData: Partial<IProduct>,
): Promise<any> => {
  const product = await Product.findOne({ id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // If slug is being updated, check for duplicates
  if (updateData.slug && updateData.slug !== product.slug) {
    const existingProduct = await Product.findOne({
      slug: updateData.slug.toLowerCase(),
      _id: { $ne: product._id },
    });

    if (existingProduct) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Product with slug "${updateData.slug}" already exists`,
      );
    }
  }

  // Update fields
  Object.assign(product, updateData);
  await product.save();

  return product.toObject();
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  const product = await Product.findOne({ id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  await product.deleteOne();
};

// Update stock
export const updateStock = async (
  id: string,
  quantity: number,
  operation: 'increase' | 'decrease',
): Promise<any> => {
  const product = await Product.findOne({ id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if (operation === 'decrease' && product.stock < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Insufficient stock. Available: ${product.stock}`,
    );
  }

  product.stock += operation === 'increase' ? quantity : -quantity;

  if (operation === 'decrease') {
    product.totalSold += quantity;
  }

  await product.save();

  return product.toObject();
};

// Update product status
export const updateProductStatus = async (
  id: string,
  status: 'active' | 'draft' | 'archived',
): Promise<any> => {
  const product = await Product.findOne({ id });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  product.status = status;
  await product.save();

  return product.toObject();
};

export const getFeaturedProducts = async (limit?: number): Promise<any[]> => {
  const query = {
    featured: true,
    status: 'active',
  };

  let productsQuery = Product.find(query).sort({ createdAt: -1 });

  if (limit && limit > 0) {
    productsQuery = productsQuery.limit(limit);
  }

  const products = await productsQuery.lean();
  return products;
};

export const getProductsByCategory = async (
  category: string,
): Promise<any[]> => {
  const products = await Product.find({
    category: { $regex: new RegExp(`^${category}$`, 'i') },
    status: 'active',
  })
    .sort({ createdAt: -1 })
    .lean();

  return products;
};