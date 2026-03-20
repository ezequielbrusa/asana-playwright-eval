# Asana Playwright Evaluation (TypeScript, Data-Driven)

This project implements a data-driven Playwright test suite for the demo app:
`https://animated-gingersnap-8cf7f2.netlify.app/`

It validates 6 required scenarios using one reusable test flow powered by a JSON dataset.

## Quick Start

1. Install dependencies:
`npm install`

2. Install browsers (one-time):
`npx playwright install`

3. Run evaluation suite (Chromium):
`npm test`

4. Open HTML report:
`npm run report`

## NPM Scripts

- `npm test`
Runs the assignment suite only: `tests/e2e/tasks.spec.ts` on Chromium.

- `npm run test:all`
Runs all Playwright tests in the repository.

- `npm run test:headed`
Runs the assignment suite with a visible browser window (good for demos/debugging).

- `npm run test:ui`
Opens Playwright UI mode.

- `npm run report`
Opens the generated HTML report.

## Project Structure

- `playwright.config.ts`
Global Playwright configuration:
  - Base URL is set to the demo app.
  - Reporter is HTML.
  - Chromium project is used for this assignment.

- `tests/test-data/tasks.json`
Single source of truth for all 6 scenarios.
Each entry defines:
  - test name
  - workspace
  - task title
  - expected column
  - expected tags

- `tests/helpers/auth.ts`
Reusable login helper:
  - Opens app
  - Enters `admin` / `password123`
  - Submits login
  - Confirms successful post-login state

- `tests/helpers/board.ts`
Reusable board interaction/assertion helper:
  - Opens workspace from sidebar
  - Locates columns by heading (`To Do`, `In Progress`, `Done`)
  - Locates task card within the correct column
  - Verifies required tags on the task card

- `tests/e2e/tasks.spec.ts`
Data-driven E2E spec:
  - Loads JSON scenarios
  - Generates one test per scenario
  - Reuses helper functions for login/navigation/assertions

## Why This Is Data-Driven

The spec does not duplicate the same workflow 6 times.
Instead, it loops through `tasks.json` and executes the same flow for each record.

Benefits:
- Less duplication
- Easier maintenance
- Faster extension (add new case by adding JSON record)

## How to Explain This in the Interview (Simple Script)

1. "I separated test data from test logic using `tasks.json`."
2. "I created helper files (`auth.ts`, `board.ts`) to avoid repeating selectors and actions."
3. "The spec file loads JSON and generates one test per case, which is scalable."
4. "If a new requirement appears, we usually add a JSON row instead of copy-pasting test code."
5. "I verified all 6 scenarios pass in Chromium and used HTML reports for visibility."

## Assignment Coverage

The suite validates:
- Login with provided credentials
- Workspace navigation:
  - Web Application
  - Mobile Application
- Task-in-column checks:
  - To Do
  - In Progress
  - Done
- Tag assertions per scenario:
  - Feature
  - High Priority
  - Bug
  - Design

## Notes

- This solution is written fully in TypeScript/Playwright.
- Browser warnings about `NO_COLOR` are harmless and do not affect test validity.
