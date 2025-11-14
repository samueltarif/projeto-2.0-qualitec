-- Grant permissions for usuarios table
GRANT SELECT ON usuarios TO anon;
GRANT SELECT ON usuarios TO authenticated;
GRANT INSERT ON usuarios TO anon;
GRANT INSERT ON usuarios TO authenticated;