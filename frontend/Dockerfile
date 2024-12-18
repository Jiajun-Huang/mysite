# Use an official Node.js runtime as a parent image
FROM node:23-alpine3.20 AS base

# Set the working directory in the container
WORKDIR /app
RUN pwd

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp/

# Install sharp globally for production (with verbose output)
RUN npm config set strict-ssl false
RUN npm i sharp -g --production --verbose

# Create a non-root user and group to run the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Set the working directory as the non-root user

# Copy public assets to the container
COPY --chown=nextjs:nodejs public ./public

# Set the correct permissions for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the built Next.js files from the host machine
COPY --chown=nextjs:nodejs .next/standalone ./ 
COPY --chown=nextjs:nodejs .next/static ./.next/static

USER nextjs
# Expose the port the app runs on
EXPOSE 3000

# Set the PORT environment variable
ENV PORT=3000

# Set the command to run the application
CMD ["node", "server.js"]
