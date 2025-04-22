type NonNullVariant<T> = T extends { [K in keyof T]: null } ? never : T;

export function assertUserExists(
  authLocal: App.Locals['auth'],
): asserts authLocal is NonNullVariant<App.Locals['auth']> {
  if (!authLocal) throw new Error('User must be logged in');
}
