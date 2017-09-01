INSERT INTO todo_table
(task) VALUES ($1);
SELECT task
FROM todo_table
WHERE done = 0;
