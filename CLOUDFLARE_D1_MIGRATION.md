# Cloudflare D1 Database Migration Guide

This guide covers the complete migration from Supabase to Cloudflare D1 for the SM Supports meeting booking system.

## Prerequisites

1. Cloudflare account with Pages and D1 access
2. Wrangler CLI installed: `npm install -g wrangler`
3. Authenticated with Cloudflare: `wrangler login`

## Step 1: Create Cloudflare D1 Database

```bash
# Create the D1 database
wrangler d1 create sm-supports-meetings

# The command will return database information like:
# ✅ Successfully created DB 'sm-supports-meetings' in region APAC
# Created your new D1 database.
# 
# [[d1_databases]]
# binding = "DB" # i.e. available in your Worker on env.DB
# database_name = "sm-supports-meetings"
# database_id = "your-database-id-here"
```

## Step 2: Update Wrangler Configuration

Update `wrangler.toml` with your database ID:

```toml
name = "sm-supports"
compatibility_date = "2024-01-01"
pages_build_output_dir = "out"

[[d1_databases]]
binding = "DB"
database_name = "sm-supports-meetings"
database_id = "your-database-id-from-step-1"
```

## Step 3: Initialize Database Schema

```bash
# Apply the schema to your D1 database
wrangler d1 execute sm-supports-meetings --file=./schema.sql
```

The schema creates a `meetings` table with the following structure:
- `id`: Auto-incrementing primary key
- `name`: VARCHAR(255) for client name
- `email`: VARCHAR(255) for client email
- `date`: DATE for meeting date
- `time_slot`: VARCHAR(10) for time slot (e.g., "09:00")
- `message`: TEXT for additional message
- `timezone`: VARCHAR(50) for client timezone
- `created_at`: TIMESTAMP for record creation
- `updated_at`: TIMESTAMP for last update

## Step 4: Deploy to Cloudflare Pages

```bash
# Build the Next.js application
npm run build

# Deploy to Cloudflare Pages (if using direct upload)
wrangler pages deploy out --project-name sm-supports

# Or connect your GitHub repository in Cloudflare Dashboard for automatic deployments
```

## Step 5: Configure Environment Variables

In your Cloudflare Pages dashboard, set the following environment variables:

### Production Variables:
- `EMAIL_USER`: Your Gmail address for sending emails
- `EMAIL_PASS`: Your Gmail app password
- `ADMIN_EMAIL`: Email address to receive booking notifications
- `NODE_ENV`: Set to "production"

### Development Variables (optional):
- Same as production, but you can use different email addresses for testing

## Step 6: Test Database Connection

You can test your D1 database using Wrangler:

```bash
# List all meetings
wrangler d1 execute sm-supports-meetings --command="SELECT * FROM meetings;"

# Check table structure
wrangler d1 execute sm-supports-meetings --command=".schema"

# Insert test data
wrangler d1 execute sm-supports-meetings --command="INSERT INTO meetings (name, email, date, time_slot, message, timezone) VALUES ('Test User', 'test@example.com', '2024-01-15', '10:00', 'Test meeting', 'America/New_York');"
```

## Migration Changes Summary

### Files Modified:
- `wrangler.toml`: Added D1 database binding
- `next.config.js`: Added serverActions: false for static export compatibility
- `app/schedule/page.tsx`: Updated to use Cloudflare service
- Removed: `app/api/` directory (replaced with Cloudflare Pages Functions)

### Files Created:
- `schema.sql`: Database schema for D1
- `lib/database.ts`: D1 database client wrapper
- `lib/meetingServiceCloudflare.ts`: Service layer for D1 operations
- `functions/api/schedule.ts`: Cloudflare Pages Function for meeting booking
- `functions/api/timeslots.ts`: Cloudflare Pages Function for time slot checking

### Key Benefits:
1. **Better Performance**: D1 is optimized for edge computing
2. **Integrated Ecosystem**: Native integration with Cloudflare Pages
3. **No Cold Starts**: Functions run at the edge with minimal latency
4. **Cost Effective**: D1 has generous free tier limits
5. **Static Export Compatible**: No server-side dependencies in Next.js build

## API Endpoints

After deployment, your application will have these API endpoints:

- `POST /api/schedule`: Create new meeting booking
- `GET /api/timeslots?date=YYYY-MM-DD`: Get available/booked time slots for a date

## Troubleshooting

### Common Issues:

1. **D1 Database Not Found**: Ensure database ID in `wrangler.toml` matches the one created
2. **Environment Variables Missing**: Check Cloudflare Pages dashboard for all required variables
3. **Build Failures**: Ensure all API routes are removed and imports updated
4. **Email Not Working**: Verify Gmail app password and admin email configuration

### Testing Locally:

```bash
# Start local development with D1
wrangler pages dev out --d1 DB=sm-supports-meetings

# Test API endpoints locally
curl -X POST http://localhost:8788/api/schedule \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","date":"2024-01-15","timeSlot":"10:00","message":"Test"}'
```

## Data Migration (If Needed)

If you have existing data in Supabase, you can export it and import to D1:

1. Export from Supabase (using SQL or dashboard)
2. Format as INSERT statements
3. Run using: `wrangler d1 execute sm-supports-meetings --file=migration.sql`

## Next Steps

1. Test all functionality in staging environment
2. Update any hardcoded API URLs in frontend
3. Monitor Cloudflare Analytics for performance
4. Set up alerts for any errors in Functions
5. Consider implementing caching for frequently accessed data

The migration is now complete! Your meeting booking system runs entirely on Cloudflare's edge infrastructure with D1 database backend.