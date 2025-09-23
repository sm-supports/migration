# Cloudflare Pages Build Configuration

# Node.js version
NODE_VERSION=18

# Build command
BUILD_COMMAND=npm ci && npm run build

# Output directory  
PUBLISH_DIRECTORY=out

# Environment variables needed:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY