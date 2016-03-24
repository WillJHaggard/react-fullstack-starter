import api from "shared/api/softEng";
import {softEng} from "shared/types";
import state from "frontend/state";
import ajax from "frontend/ajax";

let dataCursor = state.select(api.plural);
let itemsCursor = dataCursor.select("items");

// Id -> Maybe softEng
export default function fetchItem(id) {
  console.debug(api.plural + `.fetchItem(${id})`);

  return ajax.get(api.itemUrl.replace(":id", id))
    .then(response => {
      if (response.status.startsWith("2")) {
        let item = softEng(response.data.data);
        itemsCursor.set(id, item);
        return item;
      } else {
        return undefined;
      }
    });
}
