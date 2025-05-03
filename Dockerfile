FROM oven/bun:1 as builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Create a modified codefort.ts for build time to avoid connection attempts
RUN mkdir -p /app/src/lib/server/tmp
RUN echo '// Mock codefort client for build\n\
import { CODEFORT_URL } from "$env/static/private";\n\
\n\
async function getLanguages() {\n\
  return [{ id: "javascript", name: "JavaScript" }];\n\
}\n\
\n\
export const languages = await getLanguages();\n\
\n\
export async function execute(language, code, stdin, compileTimeout, compileMemoryLimit, runTimeout, runMemoryLimit) {\n\
  return { exitCode: 0, stdout: "", stderr: "", stats: { compile: null, run: { realTime: 0 } } };\n\
}' > /app/src/lib/server/tmp/mock-codefort.ts

# Backup original file and use mock
RUN cp /app/src/lib/server/codefort.ts /app/src/lib/server/codefort.ts.orig
RUN cp /app/src/lib/server/tmp/mock-codefort.ts /app/src/lib/server/codefort.ts

# Create .env file for build
RUN echo "CODEFORT_URL=\"http://codefort:3000\"" > .env
RUN echo "DATABASE_URL=\"postgres://happyjudge:happyjudge@postgres:5432/happyjudge\"" >> .env

# Make sure SvelteKit processes the environment variables
RUN bun run prepare

# Build the application
RUN bun run build

# Restore original codefort.ts
RUN cp /app/src/lib/server/codefort.ts.orig /app/src/lib/server/codefort.ts

FROM oven/bun:1-slim as runner

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built application and necessary files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/lib/server/codefort.ts ./src/lib/server/codefort.ts
# Copy database schema and migration tools
COPY --from=builder /app/src/lib/server/db ./src/lib/server/db
COPY --from=builder /app/drizzle.config.ts ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Push database schema
ENV DATABASE_URL=postgres://happyjudge:happyjudge@postgres:5432/happyjudge
RUN bun run db:push --force

RUN echo '#!/bin/sh\n\
# Wait for PostgreSQL to be ready\n\
until nc -z postgres 5432; do\n\
  echo "Waiting for PostgreSQL to start..."\n\
  sleep 1\n\
done\n\
\n\
# Push database schema\n\
echo "Initializing database schema..."\n\
bun run db:push --force\n\
\n\
# Start the application\n\
exec bun ./build' > /app/start.sh

RUN chmod +x /app/start.sh

# Expose the port
EXPOSE 3001

# Run the startup script
CMD ["/app/start.sh"]
