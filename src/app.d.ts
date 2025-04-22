// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      auth: import('$lib/server/auth').SessionValidationResult;
    }
  }
}

export {};
