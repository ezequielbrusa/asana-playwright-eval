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
Runs the assignment suite with a visible browser window.

- `npm run test:ui`
Opens Playwright UI mode.

- `npm run report`
Opens the generated HTML report.

## Project Structure

- `playwright.config.ts`
Global Playwright configuration.

- `tests/test-data/tasks.json`
Single source of truth for all 6 scenarios.

- `tests/helpers/auth.ts`
Reusable login helper.

- `tests/helpers/board.ts`
Reusable board navigation and assertions.

- `tests/e2e/tasks.spec.ts`
Data-driven E2E spec that loads JSON scenarios and generates one test per case.

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
