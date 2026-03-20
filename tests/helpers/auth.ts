import { expect, Page } from '@playwright/test';

/**
 * Helper module: Authentication
 *
 * Why this file exists:
 * - Keeps login logic in one place (no duplication across tests).
 * - Makes tests easier to read: each test says "loginAsAdmin(page)" instead of
 *   repeating selector details.
 * - If the login UI changes, we update this file once and all tests stay clean.
 *
 * Interview talking points:
 * - "I centralized authentication to improve maintainability."
 * - "I used stable selectors and a post-login assertion to avoid false positives."
 */

export const DEMO_CREDENTIALS = {
  email: 'admin',
  password: 'password123',
} as const;

/**
 * Logs into the demo application with the required credentials.
 *
 * Flow:
 * 1) Open base URL (from Playwright config).
 * 2) Fill username/email and password.
 * 3) Submit form.
 * 4) Assert successful login by checking workspace text visibility.
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/');

  const emailInput = page
    .locator(
      'input[name="email"], input[name="username"], input[type="text"], input[placeholder*="email" i]'
    )
    .first();

  const passwordInput = page
    .locator('input[name="password"], input[type="password"]')
    .first();

  await emailInput.fill(DEMO_CREDENTIALS.email);
  await passwordInput.fill(DEMO_CREDENTIALS.password);

  const submitButton = page
    .getByRole('button', { name: /log in|login|sign in/i })
    .first();

  await submitButton.click();

  // Post-login guard: proves we reached the board area, not just clicked submit.
  await expect(page.getByText(/web application|mobile application/i).first()).toBeVisible();
}
