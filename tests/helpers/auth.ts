import { expect, Page } from '@playwright/test';

export const DEMO_CREDENTIALS = {
  email: 'admin',
  password: 'password123',
} as const;

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/');

  const emailInput = page
    .locator(
      'input[name="username"], input[name="email"], input[placeholder*="email" i], input[type="text"]'
    )
    .first();
  const passwordInput = page.locator('input[name="password"]').first();

  await emailInput.fill(DEMO_CREDENTIALS.email);
  await passwordInput.fill(DEMO_CREDENTIALS.password);

  await page.getByRole('button', { name: /log in|login|sign in/i }).first().click();

  await expect(page.getByText(/web application|mobile application/i).first()).toBeVisible();
}
