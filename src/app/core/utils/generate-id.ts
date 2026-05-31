export const generateId = (): string =>
  // eslint-disable-next-line no-magic-numbers
  Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
