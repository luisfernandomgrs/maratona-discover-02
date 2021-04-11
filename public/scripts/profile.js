import Theme from './dark-theme.js';

const myTheme = Theme();

document.querySelector('.input-check-dark-mode').addEventListener('click', myTheme.ChangeDarkTheme);