# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group to run the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy public assets to the container
COPY public ./public

# Set the correct permissions for prerender cache
RUN mkdir .next \
    && chown nextjs:nodejs .next

# Copy the built Next.js files from the host machine
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the PORT environment variable
ENV PORT=3000

# Copy the startup script
COPY docker_start.sh /docker_start.sh

# Set the command to run the application
CMD ["node", "server.js"]
