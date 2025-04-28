-- Update script for dbo.corporate_ranking table
BEGIN TRANSACTION;

UPDATE dbo.corporate_ranking
SET
    rank_score = CASE
                     WHEN current_revenue > 1000000 THEN rank_score + 10
                     WHEN current_revenue > 500000 THEN rank_score + 5
                     ELSE rank_score
        END,
    last_updated_date = GETDATE(),
    status = CASE
                 WHEN rank_score >= 90 THEN 'PREMIUM'
                 WHEN rank_score >= 70 THEN 'STANDARD'
                 ELSE 'BASIC'
        END
WHERE
    -- Add your WHERE clause conditions here
    -- Example: WHERE active_flag = 1
    active_flag = 1;

-- Verify the changes
SELECT * FROM dbo.corporate_ranking
WHERE last_updated_date = CAST(GETDATE() AS DATE);

-- If everything looks good, commit the transaction
-- COMMIT TRANSACTION;
-- If there are issues, you can rollback
-- ROLLBACK TRANSACTION;