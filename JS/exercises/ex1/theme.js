// exercise 1 - theme.js
export const VALID_THEMES = ['light', 'dark', 'auto'];

export function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

export function setTheme(theme) {
  if (!VALID_THEMES.includes(theme)) {
    throw new Error(`Theme "${theme}" không hợp lệ`);
  }
  localStorage.setItem('theme', theme);
  document.body.className = `theme-${theme}`;
}
