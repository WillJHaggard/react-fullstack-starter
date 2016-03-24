import api from "shared/api/uxEng";
import {uxEng} from "shared/types";
import {parseAs} from "shared/parsers";
import state from "frontend/state";
import ajax from "frontend/ajax";

let dataCursor = state.select(api.plural);
let itemsCursor = dataCursor.select("items");

// Object -> Maybe uxEng
export default function editItem(data) {
  console.debug(api.plural + `.editItem(${data.id})`);

  let item = parseAs(uxEng, data);
  let id = item.id;

  // Optimistic update
  let oldItem = itemsCursor.get(id);
  itemsCursor.set(id, item);

  return ajax.put(api.itemUrl.replace(":id", id), item)
    .then(response => {
      if (response.status.startsWith("2")) {
        if (response.status == "200" && response.data.data) {
          item = itemsCursor.set(id, parseAs(uxEng, response.data.data));
        }
        return item;
      } else {
        itemsCursor.set(id, oldItem);
        throw Error(response.statusText);
      }
    });
}
