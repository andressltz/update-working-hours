import dotenv from 'dotenv';
import select, { Separator } from '@inquirer/select';

import { MONTH_OPTIONS } from './src/constants/index.js';
import { initBrowser, wait } from './src/utils/index.js';
import { 
  gotoPreviousMonth,  
  gotoMainPage, 
  fillWorkingDays,
} from './src/lib/index.js'

dotenv.config();

async function init() {
  const selectedMonth = await select({
    message: 'Select a mounth to fill working hours:',
      choices: [...MONTH_OPTIONS, new Separator()],
  });

  const { browser, page } = await initBrowser();

  await gotoMainPage({ page });

  if (selectedMonth === 'previous') {
    await gotoPreviousMonth({ page });
  }

  await fillWorkingDays({ browser, page });

  await page.evaluate(() => {
    localStorage.setItem('@access_selectedMonth', '');
  });

  await browser.close()
}

await init();


