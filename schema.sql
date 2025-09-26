-- Cloudflare D1 Database Schema for SM Supports Meetings
-- Run this after creating your D1 database

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  date TEXT NOT NULL, -- YYYY-MM-DD format
  time_slot TEXT NOT NULL, -- HH:MM format  
  status TEXT DEFAULT 'scheduled',
  timezone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for efficient querying by date and time_slot
CREATE INDEX IF NOT EXISTS idx_meetings_date_time ON meetings(date, time_slot);

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);

-- Create index for email queries (for admin lookups)
CREATE INDEX IF NOT EXISTS idx_meetings_email ON meetings(email);