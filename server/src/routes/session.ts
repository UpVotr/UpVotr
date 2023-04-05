import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { Router } from "express";
import { execute } from "../mysql/connection";
import { UserDataRow } from "../mysql/query/types";
import { getUser } from "../mysql/query/users";

const sessionRouter = createModule(
  new PersistManager(),
  new Runner(() => {
    const router = Router();

    router.get("/session", async (req, res) => {
      const {
        result: [user]
      } = await execute<UserDataRow[]>(
        ...getUser(req.session.passport?.user || "", [
          "avatarURL",
          "displayName"
        ])
      );
      res.json({
        loggedIn: !!req.session.passport?.user,
        userId: req.session.passport?.user,
        displayName: user?.displayName,
        avatarURL: user?.avatarURL
      });
    });

    return router;
  }),
  false
);

export = sessionRouter;
