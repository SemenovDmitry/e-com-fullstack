-- Migration: rename_auth_token_to_token
-- Description: Rename auth_token column to token and expand its size

BEGIN;

-- Rename column
ALTER TABLE users RENAME COLUMN auth_token TO token;

-- Rename index
ALTER INDEX idx_users_auth_token RENAME TO idx_users_token;

-- Expand column size from VARCHAR(255) to VARCHAR(500)
ALTER TABLE users ALTER COLUMN token TYPE VARCHAR(500);

COMMIT;
