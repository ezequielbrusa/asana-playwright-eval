import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { loginAsAdmin } from '../helpers/auth';
import { expectTaskInColumn, expectTaskTags, openWorkspace, TaskCase } from '../helpers/board';

const WORKSPACES = new Set<TaskCase['workspace']>(['Web Application', 'Mobile Application']);
const COLUMNS = new Set<TaskCase['column']>(['To Do', 'In Progress', 'Done']);

function isTaskCase(value: unknown): value is TaskCase {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === 'string' &&
    WORKSPACES.has(candidate.workspace as TaskCase['workspace']) &&
    typeof candidate.taskTitle === 'string' &&
    COLUMNS.has(candidate.column as TaskCase['column']) &&
    Array.isArray(candidate.expectedTags) &&
    candidate.expectedTags.every((tag) => typeof tag === 'string')
  );
}

function loadTaskCases(): TaskCase[] {
  const dataPath = path.resolve(process.cwd(), 'tests/test-data/tasks.json');
  const raw = readFileSync(dataPath, 'utf8');
  const parsed: unknown = JSON.parse(raw);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('tasks.json must contain a non-empty array of test cases.');
  }

  const invalidIndex = parsed.findIndex((item) => !isTaskCase(item));
  if (invalidIndex !== -1) {
    throw new Error(`Invalid test case at index ${invalidIndex} in tasks.json.`);
  }

  return parsed;
}

const taskCases = loadTaskCases();

test.describe('Asana demo board - data-driven task verification', () => {
  for (const scenario of taskCases) {
    test(scenario.name, async ({ page }) => {
      await loginAsAdmin(page);
      await openWorkspace(page, scenario.workspace);

      const taskCard = await expectTaskInColumn(page, scenario.column, scenario.taskTitle);
      await expectTaskTags(taskCard, scenario.expectedTags);
    });
  }
});
