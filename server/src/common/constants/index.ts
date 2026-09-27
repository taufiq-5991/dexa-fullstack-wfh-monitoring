export const DATABASE_CONFIG = {
  HOST: 'localhost',
  PORT: 3306,
  USER: 'your_username',
  PASSWORD: 'your_password',
  DATABASE: 'your_database_name',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-key-change-in-production';
export const TOKEN_EXPIRY = '7d';