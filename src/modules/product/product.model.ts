import mongoose, { Model, Schema } from 'mongoose';
import type { IImage, IProduct } from './product.types.js';

const ImageSchema = new Schema<IImage>(
  {
    url: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    alt: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: false },
);

const ProductSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomUUID(),
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be greater than or equal to 0'],
    },
    images: {
      type: [ImageSchema],
      required: [true, 'At least one image is required'],
      validate: {
        validator: (images?: IImage[]) => !!images?.[0]?.url?.trim(),
        message: 'At least one image URL is required',
      },
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Total sold cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: {
        values: ['active', 'draft', 'archived'],
        message: '{VALUE} is not a valid status',
      },
      default: 'draft',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ── Fix 2: declare virtuals on the schema with explicit `this` type ──────────

ProductSchema.virtual('inStock').get(function (this: IProduct): boolean {
  return this.stock > 0;
});

ProductSchema.virtual('onSale').get(function (this: IProduct): boolean {
  return this.originalPrice !== undefined && this.originalPrice > this.price;
});

// Fix 1: guard originalPrice before arithmetic ────────────────────────────────
ProductSchema.virtual('discountPercentage').get(function (
  this: IProduct,
): number {
  if (
    this.originalPrice !== undefined &&
    this.originalPrice > 0 &&
    this.originalPrice > this.price
  ) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100,
    );
  }
  return 0;
});

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1, status: 1 });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ tags: 1 });

ProductSchema.pre('save', async function () {
  if (!this.isModified('slug') || !this.slug) return;

  this.slug = this.slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  if (process.env.NODE_ENV !== 'test') {
    const existingProduct = await mongoose.models.Product?.findOne({
      slug: this.slug,
      _id: { $ne: this._id },
    });

    if (existingProduct) {
      throw new Error(`Slug "${this.slug}" is already in use`);
    }
  }
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
