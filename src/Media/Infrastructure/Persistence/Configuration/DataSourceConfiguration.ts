import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // database: process.env.POSTGRES_DB,
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/Schemas/*.{ts,js}'],
  synchronize: false,
  migrations: [__dirname + '/../**/Migrations/*.{ts,js}'],
});
