import {addIndex, insert, map, reduce} from "ramda";
import {toObject} from "shared/helpers/common";
import {formatQueryForAxios} from "shared/helpers/jsonapi";
import api from "shared/api/softEng";
import {softEng} from "shared/types";
import {parseAs} from "shared/parsers";
import state from "frontend/state";
import ajax from "frontend/ajax";

let reduceIndexed = addIndex(reduce);
let dataCursor = state.select(api.plural);
let itemsCursor = dataCursor.select("items");

// Filters, Sorts, Offset, Limit -> Maybe [softEng]
export default function fetchIndex(filters, sorts, offset, limit) {
  console.debug(api.plural + `.fetchIndex(...)`);

  let query = formatQueryForAxios({filters, sorts, offset, limit});

  return ajax.get(api.indexUrl, {params: query})
    .then(response => {
      if (response.status.startsWith("2")) {
        let newItemsArray = map(m => parseAs(softEng, m), response.data.data);
        let newItems = toObject(newItemsArray);
        itemsCursor.merge(newItems);
        dataCursor.set("total", response.data.meta.page.total);
        dataCursor.apply("pagination", ps => {
          return reduceIndexed((memo, m, i) => {
              return insert(offset + i, m.id, memo);
            }, ps, newItemsArray
          );
        });
        return newItems;
      } else {
        return [];
      }
    });
}