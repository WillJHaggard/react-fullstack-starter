import Tc from "tcomb";
import Express from "express";
import {merge} from "shared/helpers/common";
import {uxEng} from "shared/types";
import {parseAs} from "shared/parsers";
import makeuxEng from "shared/makers/uxEng";
import middlewares from "backend/middlewares";
import DB from "backend/dbs/uxEng";

let router = Express.Router();

router.post("/",
  middlewares.createParseQuery(Tc.Any),
  middlewares.createParseBody(uxEng),
  function handler(req, res, cb) {
    let item = parseAs(uxEng, merge(makeuxEng(), req.body));
    DB[item.id] = item;
    let payload = {
      data: item,
    };
    return res.status(201).send(payload); // Status: created
  }
);

export default router;
