## Coding Practices

1. Maintain Type Safety with TypeScript
    - Use type annotations and interfaces wherever applicable. 
    - Leverage utility types like Partial, Pick, and Record for reusable and scalable code. 
    - Enable strict TypeScript compiler options (e.g., strict: true, noImplicitAny, strictNullChecks) in your tsconfig.json. 
    - Ensure third-party libraries are properly typed by installing their @types packages if needed (e.g., @types/jquery).

2. Structure and Organize Your Codebase
   - Organize files by feature or domain rather than by type (e.g., components/Button, hooks/useAuth).
   - Create reusable UI components with libraries like react and framer-motion for animations.
   - Use barrel files (index.ts) for better module imports, avoiding long relative paths.
   - Separate concerns by creating dedicated directories for logic (e.g., services, utils, types).

3. Focus on Performance Optimization 
   - Use libraries like react-swipeable and framer-motion efficiently by animating only necessary components.
   - Lazy-load components with React.lazy() and Suspense.
   - Minimize DOM manipulation by leveraging libraries like jquery sparingly.
   - Optimize assets with tools like grunt for minification and compression.

4. Ensure Consistent Code Quality
   - Use linting tools like ESLint with TypeScript support (eslint-config-react-app).
   - Set up Prettier for consistent formatting.
   - Use a CSS preprocessor like SCSS if animate.css and bootstrap require customization.
   - Regularly refactor to remove unused imports, dead code, or redundant logic.

5. Document code properly
   - Particularly for complex components or utility functions. 
   - Use tools like JSDoc or inline comments to provide clarity.

## Testing Practices

### Functional Testing
- Use the Playwright testing framework
- Example Playwright tests to follow for this project:
```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Screenshot to Code/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:4000');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test.describe('New Upload Image flow', () => {
    test('should allow me to upload an image to the server', async ({ page }) => {
        // create a new todo locator
        const newTodo = page.getByPlaceholder('What needs to be done?');

        // Create 1st todo.
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press('Enter');

        // Make sure the list only has one todo item.
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0]
        ]);

        // Create 2nd todo.
        await newTodo.fill(TODO_ITEMS[1]);
        await newTodo.press('Enter');

        // Make sure the list now has two todo items.
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);

        await checkNumberOfTodosInLocalStorage(page, 2);
    });
});
```
- all Playwright integration tests will be in the folder tests which is a subfolder of the root directory of this project
- default city use symbol NYC
- follow SOLID principles