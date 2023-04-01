// @ts-check
import { test, expect } from '@playwright/test';

test('locators', async ({ page }) => {
  await page.goto('https://www.onliner.by/');
   
  // screenshots - go to the img folder
  await page.locator('.onliner_logo').screenshot({path: 'img/task1.jpeg'});
  await page.locator('xpath=//input[@class="fast-search__input"]').screenshot({path: 'img/task2.jpeg'});
  await page.getByRole('link', { name: 'Onlíner Клевер' }).screenshot({path: 'img/task3.jpeg'});
  await page.getByText('Умные часы и браслеты').screenshot({path: 'img/task4.jpeg'});
  await page.locator('.project-navigation__item'); //list of elements
  await page.locator('.project-navigation__item').nth(1).screenshot({path: 'img/task5.jpeg'});
  await page.getByPlaceholder("Поиск в Каталоге. Например, ").screenshot({path: 'img/task6.jpeg'});
  await page.getByAltText('Onlíner').screenshot({path: 'img/task7.jpeg'});
  await page.getByTitle('Корзина').screenshot({path : 'img/task8.jpeg'});
  await page.screenshot({path: 'img/taskpage.jpeg'});
  
});

test('forum locators', async ({ page }) => {
  await page.goto('https://forum.onliner.by/');

  await page.locator('.h-hottopics').screenshot({path : 'img/task9.jpeg'});

  await page
    .getByRole('listitem')
    .filter({ hasText: /Бюро находок/ })
    .getByText('226')
    .screenshot({path : 'img/task10.jpeg'});

  
  await page
    .getByRole('listitem')
    .filter({ has: page.getByText('Благотворительность. Им нужна помощь!')})
    .getByRole('link').last()
    .screenshot({path : 'img/task11.jpeg'});
 
})