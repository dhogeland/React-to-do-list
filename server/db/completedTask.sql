UPDATE todo_table
SET done = 1
WHERE task = $1;
SELECT *
FROM todo_table
WHERE done = 1;
