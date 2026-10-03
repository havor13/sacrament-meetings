import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export type User = { id: string; name: string; email: string; passwordHash: string };

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql`
    SELECT id::text AS id, name, email, password_hash AS "passwordHash"
    FROM users WHERE email = ${email}
  `;
  return (rows[0] as unknown as User) ?? null;
}