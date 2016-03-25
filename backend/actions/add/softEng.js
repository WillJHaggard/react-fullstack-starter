import Tc from "tcomb";
import Express from "express";
import {merge} from "shared/helpers/common";
import {softEng} from "shared/types";
import {parseAs} from "shared/parsers";
import makesoftEng from "shared/makers/softEng";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/softEng";

let router = Express.Router();

router.post("/",
  middlewares.createParseQuery(Tc.Any),
  middlewares.createParseBody(softEng),
  function handler(req, res, cb) {
    let item = parseAs(softEng, merge(makesoftEng(), req.body));
    DB[item.id] = item;
    let payload = {
      data: item,
    };
    return res.status(201).send(payload); // Status: created
  }
);

export default router;
