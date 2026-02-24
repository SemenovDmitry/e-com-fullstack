# Database Migrations

## How to run migrations

### Option 1: Run TypeScript migration script
```bash
pnpm tsx src/db/migrations/run.ts
```

### Option 2: Run SQL file directly in psql
```bash
psql -U postgres -d ecommerce -f src/db/migrations/001_rename_auth_token_to_token.sql
```

### Option 3: Copy-paste SQL in any PostgreSQL client
Open your PostgreSQL client and run the SQL from `001_rename_auth_token_to_token.sql`

## Available migrations

- `001_rename_auth_token_to_token.sql` - Rename auth_token column to token, expand field size to VARCHAR(500)
