export function onlyDigits(string: string): string {
  return string.replace(/[^\d]/g, '');
}
