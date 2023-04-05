import session from "express-session";
import { execute } from "./mysql/connection";
import {
  clearAllSessions,
  destroySessionById,
  getAllSessions,
  getSessionById,
  getSessionCount,
  setSessionById,
  touchSession
} from "./mysql/query/sessions";
import { SessionRow } from "./mysql/query/types";
import { RowDataPacket } from "mysql2";
import { config } from "./loadedConfig";
import signature from "cookie-signature";

export class SessionStore extends session.Store {
  static sessionTTL = 1206900;

  async get(
    sid: string,
    callback: (
      err: any,
      session?: session.SessionData | null | undefined
    ) => void
  ) {
    try {
      const { result } = await execute<SessionRow[]>(...getSessionById(sid));

      if (!result[0]) return callback(null, null);

      callback(null, {
        passport: {
          user: result[0].userId
        },
        cookie: result[0].cookie
      });
    } catch (e) {
      callback(e);
    }
  }

  async set(
    sid: string,
    session: session.SessionData,
    callback?: ((err?: any) => void) | undefined
  ) {
    let expires = session.cookie.expires;
    if (!expires) {
      expires = new Date(Date.now() + SessionStore.sessionTTL);
    }

    try {
      await execute(
        ...setSessionById(
          sid,
          session.passport.user ?? null,
          expires,
          session.cookie
        )
      );
      callback?.();
    } catch (e) {
      callback?.(e);
    }
  }

  async touch(
    sid: string,
    session: session.SessionData,
    callback?: (() => void) | undefined
  ) {
    try {
      await execute(...touchSession(sid));
    } finally {
      callback?.();
    }
  }

  async destroy(sid: string, callback?: ((err?: any) => void) | undefined) {
    try {
      await execute(...destroySessionById(sid));
      callback?.();
    } catch (e) {
      callback?.(e);
    }
  }

  async length(callback: (err: any, length?: number | undefined) => void) {
    try {
      const {
        result: [{ count }]
      } = await execute<({ count: number } & RowDataPacket)[]>(
        ...getSessionCount()
      );
      callback(null, count);
    } catch (e) {
      callback(e);
    }
  }

  async all(
    callback: (
      err: any,
      obj?:
        | session.SessionData[]
        | { [sid: string]: session.SessionData }
        | null
        | undefined
    ) => void
  ) {
    try {
      const { result } = await execute<SessionRow[]>(...getAllSessions());
      callback(
        null,
        result.map((row) => ({
          passport: {
            user: row.userId ?? undefined
          },
          cookie: row.cookie
        }))
      );
    } catch (e) {
      callback(e);
    }
  }

  async clear(callback?: ((err?: any) => void) | undefined) {
    try {
      await execute(...clearAllSessions());
      callback?.();
    } catch (e) {
      callback?.(e);
    }
  }
}

export const appSession = session({
  secret: config.cookie_secret,
  cookie: {
    maxAge: SessionStore.sessionTTL,
    httpOnly: true,
    secure: "auto",
    sameSite: "strict"
  },
  name: "sess",
  rolling: true,
  saveUninitialized: false,
  store: new SessionStore()
});

export function unsigncookie(
  val: string,
  secrets: string[] | string
): string | boolean {
  if (typeof secrets === "string") return unsigncookie(val, [secrets]);
  for (let i = 0; i < secrets.length; i++) {
    const result = signature.unsign(val, secrets[i]);

    if (result !== false) {
      return result;
    }
  }

  return false;
}
