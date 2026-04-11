/**
 * Validate that required environment variables are set.
 * Returns null if all are present, or an error object suitable for res.json().
 */
export function validateEnv(requiredVars) {
  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length === 0) return null;
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  return {
    error: 'Server configuration error',
    message: `Required configuration is missing: ${missing.join(', ')}`,
  };
}
