## Mandatory Rules
**Scope** – These rules apply to every sub-directory whose parent directory is named `Adhoc Updates`.

1. Each sub-directory **must** contain exactly one JSON file with the extension `.xmetadata` **or** `.metadata`.  
   *Call this file* **`metadata`**.
2. Inside `metadata`, if the property `IsBCP` exists, its value **must be** `false`.
3. **Highest-priority rule:** If `metadata.IsBCP` is `true`, the entire sub-directory **must be moved** out of `Adhoc Updates` and placed under `Tables` instead.

## General Best Practices
1. Ensure Consistent Formatting
   •	SQL statements should follow a consistent style.
   •	Prefer uppercase for SQL keywords and proper indentation.
   •	Recommend using an auto-formatter (e.g., sqlfluff) for consistency.

2. Use Clear and Descriptive File Names
   •	File names should reflect their intent, such as create_users_table.sql, insert_demo_data.sql, or update_product_status.sql.
   •	Avoid generic names like script1.sql or temp.sql.

3. Organize Files by Purpose
   •	Group SQL files into folders like ddl/, dml/, queries/, or migrations/.
   •	This improves project navigation and long-term maintainability.

4. Separate Concerns: DDL, DML, and Queries
   •	Avoid mixing different types of SQL (e.g., schema changes and queries) in the same file.
   •	Ensure each file has a focused responsibility.

5. Document Complex Logic
   •	Add comments to explain business logic, join conditions, or any non-obvious calculations.
   •	Encourage documenting intent, not just the “how.”

6. Promote Re-runnable (Idempotent) Scripts
   •	SQL scripts should be safe to re-execute when possible.
   •	Use CREATE IF NOT EXISTS, DROP IF EXISTS, and merge patterns to ensure idempotency.

7. Avoid Hardcoded Values
   •	Watch for hardcoded constants, IDs, or timestamps that reduce portability or introduce brittle behavior.
   •	Suggest parameterization or placeholders where appropriate.

8. Use Transactions for Multi-step DML
   •	Ensure that inserts, updates, and deletes affecting multiple tables or rows are wrapped in a transaction block.
   •	Helps prevent partial writes and maintains data integrity.

9. Follow the Style Guide
   •	If the project has a STYLE_GUIDE.md, check for adherence to naming conventions, aliasing rules, and join styles.
   •	Encourage updates to the guide if inconsistencies are common.

10. Flag Risky Operations
    •	Be cautious with DELETE, UPDATE, or TRUNCATE statements without a WHERE clause.
    •	Recommend adding safeguards or confirming expected behavior.

11. Review for Auditability
    •	Ensure there is a way to trace data changes for scripts that modify or remove data.
    •	Suggest including updated_at, modified_by, or writing to audit logs when relevant.

12. Validate SQL Syntax
    •	Reviewers should scan for syntax errors or malformed queries.
    •	LLMs or linters can be used to automatically check for syntactic correctness.