import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IAdmin } from './admin.types.js';

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving - Using async/await (RECOMMENDED)
adminSchema.pre('save', async function (next) {
  const admin = this as IAdmin;

  if (!admin.isModified('password')) {
    return next();
  }

  try {
    const password = admin.password;
    if (!password) {
      throw new Error('Password is required');
    }

    const salt = await bcrypt.genSalt(12);
    admin.password = await bcrypt.hash(password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
adminSchema.methods.comparePassword = async function (
  this: IAdmin,
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
adminSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
