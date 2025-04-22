import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const handleAuth: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(auth.sessionCookieName);

  if (!sessionToken) {
    event.locals.auth = {
      user: null,
      session: null,
    };
    return resolve(event);
  }

  const { session, user } = await auth.validateSessionToken(sessionToken);

  if (session) {
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    event.locals.auth = {
      user,
      session,
    };
  } else {
    auth.deleteSessionTokenCookie(event);
    event.locals.auth = {
      user: null,
      session: null,
    };
  }

  return resolve(event);
};

export const handle: Handle = handleAuth;
