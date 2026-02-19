import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
	// Connection string for PostgreSQL database
	connectionString:
		process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ecommerce',
	// Maximum number of clients in the pool
	max: 20,
	// Close idle clients after 30 seconds
	idleTimeoutMillis: 30000,
	// Connection timeout: 2 seconds
	connectionTimeoutMillis: 2000,
	// Application name visible in PostgreSQL logs for debugging
	application_name: 'ecommerce-api',
	// Query timeout: 30 seconds (prevents hanging queries)
	statement_timeout: 30000,
})

// Parse NUMERIC/DECIMAL types as floats instead of strings
pg.types.setTypeParser(1700, (value) => parseFloat(value))

pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err)
})

export default pool
