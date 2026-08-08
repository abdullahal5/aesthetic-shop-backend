
export interface IAdmin {
  username: string;
  password: string;
  role: 'super-admin' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
