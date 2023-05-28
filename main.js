import dotenv from 'dotenv';
import select, { Separator } from '@inquirer/select';

import { MONTH_OPTIONS } from './src/constants/index.js';
import { initBrowser } from './src/utils/index.js';
import { 
  fillWorkingDays,  
  gotoMainPage, 
} from './src/lib/index.js'

dotenv.config();

const answer = await select({
  message: 'Select a mounth to fill working hours:',
    choices: [...MONTH_OPTIONS, new Separator()],
});

const { browser, page } = await initBrowser();

await gotoMainPage({ page });

// TODO: Implement go to chosen month
// await gotoCurrentMonth({ page, answer });

await fillWorkingDays({ browser, page, answer });
