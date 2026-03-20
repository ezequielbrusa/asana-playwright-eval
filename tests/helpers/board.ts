import { expect, Locator, Page } from '@playwright/test';

/**
 * Helper module: Board navigation and assertions
 *
 * Why this file exists:
 * - Encapsulates how we locate workspaces, columns, cards, and tags.
 * - Keeps spec files focused on business intent ("verify task X is in column Y").
 * - Supports data-driven tests by accepting values from JSON.
 *
 * Interview talking points:
 * - "The spec is data-driven; helper functions perform reusable UI actions/assertions."
 * - "Selectors are grouped in helper utilities to reduce churn when UI changes."
 */

export type TaskCase = {
  name: string;
  workspace: 'Web Application' | 'Mobile Application';
  taskTitle: string;
  column: 'To Do' | 'In Progress' | 'Done';
  expectedTags: string[];
};

/**
 * Opens a workspace board (e.g., "Web Application", "Mobile Application").
 */
export async function openWorkspace(page: Page, workspace: TaskCase['workspace']): Promise<void> {
  // Sidebar entries are buttons whose accessible names include title + description.
  const workspaceButton = page.getByRole('button', {
    name: new RegExp(escapeRegex(workspace), 'i'),
  });
  await workspaceButton.first().click();
}

/**
 * Returns a locator for a specific board column by title.
 */
export function getColumn(page: Page, columnName: TaskCase['column']): Locator {
  // Column headings include counts (e.g., "To Do (2)"), so we match by prefix.
  const columnHeading = page.getByRole('heading', {
    level: 2,
    name: new RegExp(`^${escapeRegex(columnName)}\\b`, 'i'),
  });

  // The column container is the nearest parent block that contains this heading.
  return page
    .locator('section, div, article')
    .filter({ has: columnHeading })
    .first();
}

/**
 * Returns a locator for a task card by title within a specific column.
 */
export function getTaskCardInColumn(
  page: Page,
  columnName: TaskCase['column'],
  taskTitle: string
): Locator {
  const column = getColumn(page, columnName);

  // Task titles are level-3 headings inside cards. This is more stable than
  // matching full card text because cards contain description, tags, and metadata.
  const taskHeading = column.getByRole('heading', {
    level: 3,
    name: new RegExp(`^${escapeRegex(taskTitle)}$`, 'i'),
  });

  return column.locator('section, div, article').filter({ has: taskHeading }).first();
}

/**
 * Asserts that the task exists in the expected column.
 */
export async function expectTaskInColumn(
  page: Page,
  columnName: TaskCase['column'],
  taskTitle: string
): Promise<Locator> {
  const taskCard = getTaskCardInColumn(page, columnName, taskTitle);
  await expect(taskCard).toBeVisible();
  return taskCard;
}

/**
 * Asserts that every expected tag is visible inside the provided task card.
 *
 * Note:
 * - This validates required tags are present.
 * - We do not fail on extra tags unless the assignment asks for exact-tag matching.
 */
export async function expectTaskTags(taskCard: Locator, expectedTags: string[]): Promise<void> {
  for (const tag of expectedTags) {
    await expect(taskCard.getByText(new RegExp(`^${escapeRegex(tag)}$`, 'i')).first()).toBeVisible();
  }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
