# Quick Setup Commands for Cloudflare D1 Migration

## 1. Create D1 Database
```bash
wrangler d1 create sm-supports-meetings
```

## 2. Get Database ID from output and update wrangler.toml

## 3. Apply Schema
```bash
wrangler d1 execute sm-supports-meetings --file=./schema.sql
```

## 4. Build and Deploy
```bash
npm run build
wrangler pages deploy out --project-name sm-supports
```

## 5. Set Environment Variables in Cloudflare Dashboard
- EMAIL_USER
- EMAIL_PASS  
- ADMIN_EMAIL
- NODE_ENV=production

## Test Locally
```bash
wrangler pages dev out --d1 DB=sm-supports-meetings
```

## Verify Database
```bash
wrangler d1 execute sm-supports-meetings --command="SELECT * FROM meetings;"
```