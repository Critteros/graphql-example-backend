import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../db/schema';

export type DBClient = LibSQLDatabase<typeof schema>;
