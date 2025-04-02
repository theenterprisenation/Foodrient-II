/*
  # Enhanced Messaging System

  1. Changes
    - Add metadata column to messages table
    - Update message_type enum with new types
    - Add indexes for efficient message retrieval

  2. Security
    - No changes to existing RLS policies needed
*/

-- Update message_type enum
ALTER TYPE message_type ADD VALUE IF NOT EXISTS 'order_confirmation';
ALTER TYPE message_type ADD VALUE IF NOT EXISTS 'announcement';
ALTER TYPE message_type ADD VALUE IF NOT EXISTS 'promotion';

-- Add metadata column to messages table
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Add indexes for efficient message retrieval
CREATE INDEX IF NOT EXISTS idx_messages_type_created
  ON messages (type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_metadata
  ON messages USING gin (metadata);

-- Add function to clean up expired announcements and promotions
CREATE OR REPLACE FUNCTION clean_expired_messages()
RETURNS void AS $$
BEGIN
  UPDATE messages
  SET metadata = jsonb_set(
    metadata,
    '{status}',
    '"expired"'
  )
  WHERE (type IN ('announcement', 'promotion'))
    AND (metadata->>'expires_at')::timestamptz < NOW();
END;
$$ LANGUAGE plpgsql;