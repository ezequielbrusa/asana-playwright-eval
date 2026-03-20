import { expect, Locator, Page } from '@playwright/test';

export type TaskCase = {
  name: string;
  workspace: 'Web Application' | 'Mobile Application';
  taskTitle: string;
  column: 'To Do' | 'In Progress' | 'Done';
  expectedTags: string[];
};

export async function openWorkspace(page: Page, workspace: TaskCase['workspace']): Promise<void> {
  const workspaceButton = page.getByRole('button', {
    name: new RegExp(escapeRegex(workspace), 'i'),
  });
  await workspaceButton.first().click();
}

export function getColumn(page: Page, columnName: TaskCase['column']): Locator {
  // Column headings include counts (e.g., "To Do (2)").
  const columnHeading = page.getByRole('heading', {
    level: 2,
    name: new RegExp(`^${escapeRegex(columnName)}\\b`, 'i'),
  });

  return page.locator('section, article').filter({ has: columnHeading }).first();
}

export function getTaskCardInColumn(
  page: Page,
  columnName: TaskCase['column'],
  taskTitle: string
): Locator {
  const column = getColumn(page, columnName);
  const taskHeading = column.getByRole('heading', {
    level: 3,
    name: new RegExp(`^${escapeRegex(taskTitle)}$`, 'i'),
  });

  return column.locator('section, article').filter({ has: taskHeading }).first();
}

export async function expectTaskInColumn(
  page: Page,
  columnName: TaskCase['column'],
  taskTitle: string
): Promise<Locator> {
  const taskCard = getTaskCardInColumn(page, columnName, taskTitle);
  await expect(taskCard).toBeVisible();
  return taskCard;
}

export async function expectTaskTags(taskCard: Locator, expectedTags: string[]): Promise<void> {
  for (const tag of expectedTags) {
    await expect(taskCard.getByText(new RegExp(`^${escapeRegex(tag)}$`, 'i')).first()).toBeVisible();
  }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
