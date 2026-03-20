# Asana Playwright Evaluation Plan

## Goal
Build a data-driven Playwright test suite in JavaScript/TypeScript for the demo app and prepare a clean GitHub submission.

## Current Status (End of Day)
- Completed through Step 8.
- Test suite is passing: `6 passed` on Chromium.
- Core files are ready for submission prep.

## Step-by-Step Execution Plan

1. Project initialization
- Create `package.json` with `npm init -y`.
- Install dev dependencies: `@playwright/test`, `typescript`, `ts-node`.
- Install Playwright browsers with `npx playwright install`.

2. Base configuration
- Create `playwright.config.ts` with:
  - `testDir: ./tests`
  - `use.baseURL: https://animated-gingersnap-8cf7f2.netlify.app/`
  - `trace: "on-first-retry"`
  - HTML reporter enabled
- Create `tsconfig.json` for TypeScript test execution.
- Add `.gitignore` for `node_modules`, `playwright-report`, `test-results`.

3. Define npm scripts
- Add scripts in `package.json`:
  - `test`
  - `test:headed`
  - `test:ui`
  - `report`

4. Create data-driven test source
- Create `tests/test-data/tasks.json`.
- Add 6 cases with fields like:
  - `name`
  - `workspace` (`Web Application` or `Mobile Application`)
  - `taskTitle`
  - `column` (`To Do`, `In Progress`, `Done`)
  - `expectedTags` (array)

5. Build reusable test helpers
- `tests/helpers/auth.ts`
  - Login with email `admin` and password `password123`.
  - Assert successful post-login state.
- `tests/helpers/board.ts`
  - Navigate/select workspace tab.
  - Locate column by name.
  - Locate task card by title inside the target column.
  - Assert tags on the card.

6. Implement parameterized Playwright spec
- Create `tests/e2e/tasks.spec.ts`.
- Read JSON data and generate one `test()` per case.
- For each case:
  - Login
  - Open workspace
  - Verify task is in expected column
  - Verify expected tags match

7. Stabilize and validate
- Run suite in headless mode.
- Run suite in headed mode for visual confirmation.
- Fix flaky selectors/waits if needed.
- Ensure all 6 cases pass consistently.

8. Documentation for submission
- Create `README.md` including:
  - Prerequisites
  - Install/run commands
  - Project structure
  - Data-driven design explanation
  - How to view report

9. GitHub publication
- Initialize git.
- First commit with all source files.
- Create public GitHub repo: `asana-playwright-eval`.
- Add remote and push `main`.

10. Video deliverable
- Record 2-3 minute walkthrough:
  - Show JSON-driven structure
  - Show reusable helpers
  - Show test run result/report
  - Explain scalability and low-duplication approach

## Progress Checklist
- [x] 1. Project initialization
- [x] 2. Base configuration
- [x] 3. Define npm scripts
- [x] 4. Create data-driven test source
- [x] 5. Build reusable test helpers
- [x] 6. Implement parameterized Playwright spec
- [x] 7. Stabilize and validate (`6 passed`)
- [x] 8. Documentation for submission (`README.md` added)
- [ ] 9. GitHub publication
- [ ] 10. Video deliverable

## Start Tomorrow From Here
1. Open project folder:
`cd /Users/ezequielbrusa/sites/asana-playwright-eval`

2. Quick verification run:
`npm test`

3. Publish to GitHub:
- `git init`
- `git add .`
- `git commit -m "Add data-driven Playwright evaluation solution"`
- Create public repo `asana-playwright-eval` on GitHub
- `git remote add origin <your-repo-url>`
- `git branch -M main`
- `git push -u origin main`

4. Record and upload 2-3 minute walkthrough video.

## Estimated Time
- Setup + configuration: 30-45 min
- Data + helpers + spec: 90-150 min
- Debug/validation: 30-60 min
- README + GitHub push: 20-40 min
- Video: 20-40 min
- Total: 3.5 to 6 hours

## Definition of Done
- All 6 scenarios pass from JSON-driven tests.
- Code is TypeScript/JavaScript only.
- Public GitHub repo available.
- 2-3 minute walkthrough video ready to submit.
