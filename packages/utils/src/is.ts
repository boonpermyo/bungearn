export function isDefined(value: unknown): boolean {
  return typeof value !== 'undefined' && value !== null;
}
