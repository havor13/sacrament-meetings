// scripts/seed-user.mjs
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const email = process.env.SEED_EMAIL ?? 'test@example.com';
const password = process.env.SEED_PASSWORD ?? 'TestPass123';

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`;

const hash = await bcrypt.hash(password, 10);

await sql`
  INSERT INTO users (name, email, password_hash)
  VALUES ('Test Bishopric', ${email}, ${hash})
  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
`;

console.log(`Seeded user: ${email}`);