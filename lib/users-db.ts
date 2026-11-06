import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export type UserRole = 'branch_president' | 'counselor' | 'clerk';

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id::text AS id, name, email, password_hash AS "passwordHash", role
    FROM users WHERE email = ${email}
  `;
  return (rows[0] as unknown as User) ?? null;
}

export async function createUser(u: {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}): Promise<void> {
  await sql`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (${u.name}, ${u.email}, ${u.passwordHash}, ${u.role})
  `;
}