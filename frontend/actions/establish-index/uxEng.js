import {equals, filter} from "ramda";
import {UX} from "shared/constants";
import api from "shared/api/uxEng";
import state from "frontend/state";
import loadIndex from "frontend/actions/load-index/uxEng";

let urlCursor = state.select("url");
let urlQueryCursor = state.select("urlQuery");
let dataCursor = state.select(api.plural);

export default function establishIndex() {
  console.debug(api.plural + `.establishIndex()`);

  let urlQuery = urlQueryCursor.get();
  let urlFilters = urlQuery.filters;
  let urlSorts = urlQuery.sorts;
  let urlOffset = urlQuery.offset;
  let urlLimit = urlQuery.limit;

  let {filters, sorts} = dataCursor.get();

  if (!equals(urlFilters || UX.index.filters, filters)) {
    dataCursor.set("filters", urlFilters || UX.index.filters);
    if (true || !dataCursor.get("fullLoad")) {
      /* TODO replace true with __newFilters_are_not_subset_of_oldFilters__ */
      // Pagination is messed up, do reset
      dataCursor.merge({
        total: 0,
        pagination: [],
      });
    }
  }
  if (!equals(urlSorts || UX.index.sorts, sorts)) {
    dataCursor.set("sorts", urlSorts || UX.index.sorts);
    if (!dataCursor.get("fullLoad")) {
      // Pagination is messed up, do reset
      dataCursor.merge({
        total: 0,
        pagination: [],
      });
    }
  }
  dataCursor.set("offset", urlOffset || UX.index.offset);
  dataCursor.set("limit", urlLimit || UX.index.limit);

  return loadIndex();
}
