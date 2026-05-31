// exercise 1 - app.js (starter)
import { VALID_THEMES, getTheme, setTheme } from './theme.js';
import formats from './format.js';

console.log('VALID_THEMES:', VALID_THEMES);
console.log('Current theme:', getTheme());
console.log('Today:', formats.formatDate(new Date()));
console.log('Currency example:', formats.formatCurrency(150000));

// Example usage: change theme
// setTheme('dark');
