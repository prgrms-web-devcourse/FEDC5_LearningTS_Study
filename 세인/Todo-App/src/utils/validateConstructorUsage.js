export function validateConstructorUsage(target) {
  if (!target) {
    throw new Error('Component should be used with the "new" keyword.')
  }
}
