
export interface IAdmin extends Document {
  username: string;
  password: string;
  role: 'super-admin' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
