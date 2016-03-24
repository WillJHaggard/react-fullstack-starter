import api from "shared/api/softEng";
import state from "frontend/state";
import loadItem from "frontend/actions/load-item/softEng";

let urlCursor = state.select("url");
let dataCursor = state.select(api.plural);

export default function establishItem() {
  console.debug(api.plural + `establishItem()`);

  dataCursor.set("id", urlCursor.get("params").id);

  return loadItem();
}
