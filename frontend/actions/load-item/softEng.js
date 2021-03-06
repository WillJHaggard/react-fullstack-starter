import api from "shared/api/softEng";
import state from "frontend/state";
import fetchItem from "frontend/actions/fetch-item/softEng";

let dataCursor = state.select(api.plural);
let itemsCursor = dataCursor.select("items");

export default function loadItem() {
  console.debug(api.plural + `.loadItem()`);

  let id = dataCursor.get("id");
  let item = itemsCursor.get(id);

  if (item) {
    return Promise.resolve(item);
  } else {
    return fetchItem(id);
  }
}
