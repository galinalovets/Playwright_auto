// @ts-check
import { test, expect } from '@playwright/test';

test('onliner clever link', async ({ page }) => {
  await page.goto('https://www.onliner.by/');
  
  //click the onliner клевер link
  await page.getByRole('link', { name: 'Onlíner Клевер' }).click();
    
});

test('onliner best text', async ({ page }) => {
  await page.goto('https://www.onliner.by/');

  // Expects the element to contain Onlíner. Лучшее.
  await expect(page.getByText('Onlíner. Лучшее')).toBeVisible();

});

test('input text over placeholder', async ({ page }) => {
  await page.goto('https://www.onliner.by/');

  // 
  await page
    .getByPlaceholder("Поиск в Каталоге. Например, \"садовые качели\"")
    .fill("велосипед");

});