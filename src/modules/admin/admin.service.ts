import { Admin } from './admin.model.js';
import env from '../../config/index.js';
import { Types } from 'mongoose';

// Create super admin if not exists
export const createSuperAdminIfNotExists = async (): Promise<void> => {
  try {
    const superAdminExists = await Admin.findOne({ role: 'super-admin' });

    if (!superAdminExists) {
      const adminUsername = env.auth.admin.username;
      const adminPassword = env.auth.admin.password;

      if (!adminUsername || !adminPassword) {
        console.warn('⚠️ Admin credentials not found in environment variables');
        return;
      }

      await Admin.create({
        username: adminUsername,
        password: adminPassword,
        role: 'admin',
        isActive: true,
      });

      console.log('✅ Super Admin created successfully!');
      console.log(`📝 Username: ${adminUsername}`);
      console.log(`🔐 Password: ${adminPassword}`);
    } else {
      console.log('✅ Super Admin already exists');
    }
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
  }
};

// Find admin by username
export const findAdminByUsername = async (username: string) => {
  return await Admin.findOne({
    username: username.toLowerCase(),
    isActive: true,
  });
};

// Find admin by id - Accept string or ObjectId
export const findAdminById = async (id: string | Types.ObjectId) => {
  return await Admin.findById(id).select('-password');
};

// Update last login - Accept string or ObjectId
export const updateLastLogin = async (adminId: string | Types.ObjectId) => {
  await Admin.findByIdAndUpdate(adminId, { lastLogin: new Date() });
};
