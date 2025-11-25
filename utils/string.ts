/**
 * Replaces dashes and underscores with whitespaces
 * @param text - The text to format
 * @returns The formatted text with spaces instead of dashes/underscores
 * @example
 * formatTextWithSpaces("hello-world") // "hello world"
 * formatTextWithSpaces("hello_world") // "hello world"
 * formatTextWithSpaces("hello-world_test") // "hello world test"
 */
export function formatTextWithSpaces(text: string): string {
  return text.replaceAll(/[-_]/g, " ");
}
