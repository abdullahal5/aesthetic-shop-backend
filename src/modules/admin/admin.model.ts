// admin.model.ts
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
  { timestamps: true },
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  if (!this.password) throw new Error('Password is required');

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.set('toJSON', {
  transform: (_doc, ret: any) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
