// Cloudflare D1 Database Client
// This will work with Cloudflare Pages Functions and Workers

export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  exec: (query: string) => Promise<D1ExecResult>;
  dump: () => Promise<ArrayBuffer>;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = any>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result>;
  all: <T = any>() => Promise<D1Result<T>>;
  raw: <T = any>() => Promise<T[]>;
}

export interface D1Result<T = Record<string, any>> {
  results: T[];
  success: boolean;
  error?: string;
  meta: {
    duration: number;
    size_after: number;
    rows_read: number;
    rows_written: number;
    last_row_id?: number;
  };
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

// Database client that works in different environments
class DatabaseClient {
  private db: D1Database | null = null;

  constructor() {
    // In Cloudflare Pages Functions, the database will be available via context
    // This will be initialized when the client is used
  }

  // Initialize with D1 database instance (called from Pages Functions)
  initialize(database: D1Database) {
    this.db = database;
  }

  // Check availability
  isAvailable(): boolean {
    return this.db !== null;
  }

  // Get database instance
  getDatabase(): D1Database | null {
    return this.db;
  }
}

// Export singleton instance
export const dbClient = new DatabaseClient();

// Helper function for Pages Functions to initialize database
export function initializeDatabase(db: D1Database) {
  dbClient.initialize(db);
}