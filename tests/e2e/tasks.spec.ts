import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { loginAsAdmin } from '../helpers/auth';
import { expectTaskInColumn, expectTaskTags, openWorkspace, TaskCase } from '../helpers/board';

/**
 * E2E Spec: Data-driven validation for board tasks
 *
 * Why this file exists:
 * - Defines the end-to-end behavior required by the assignment.
 * - Reads all scenarios from JSON instead of hardcoding 6 separate test bodies.
 * - Generates one test per case to keep reporting clear and scalable.
 *
 * Interview talking points:
 * - "I used a data-driven model so adding a new scenario is just a JSON change."
 * - "The spec focuses on intent, while UI details are abstracted in helper files."
 */

/**
 * Loads and validates test data from JSON.
 *
 * We keep this function in the spec file to make the entry point self-explanatory:
 * when someone opens this file, they immediately see where data comes from.
 */
function loadTaskCases(): TaskCase[] {
  const dataPath = path.resolve(process.cwd(), 'tests/test-data/tasks.json');
  const raw = readFileSync(dataPath, 'utf8');
  const parsed = JSON.parse(raw) as TaskCase[];

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('tasks.json must contain a non-empty array of test cases.');
  }

  return parsed;
}

const taskCases = loadTaskCases();

test.describe('Asana demo board - data-driven task verification', () => {
  for (const scenario of taskCases) {
    /**
     * Each generated test follows the exact business flow requested:
     * 1) login
     * 2) navigate to workspace
     * 3) verify task location (column)
     * 4) verify required tags
     */
    test(scenario.name, async ({ page }) => {
      await loginAsAdmin(page);

      await openWorkspace(page, scenario.workspace);

      const taskCard = await expectTaskInColumn(page, scenario.column, scenario.taskTitle);

      await expectTaskTags(taskCard, scenario.expectedTags);
    });
  }
});
