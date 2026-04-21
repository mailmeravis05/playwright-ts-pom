# Use official Playwright image matching package.json version
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Create downloads and test-results folder
RUN mkdir -p downloads test-results

# Run tests by default
CMD ["sh", "-c", "npx playwright test --reporter=html && echo '✓ Tests passed. Reports saved to /app/test-results/'"]