import {filter, find, forEach, identity, keys, map, pipe, propEq, slice, sortBy, tap, values} from "ramda";
import Baobab from "baobab";
import throttle from "lodash.throttle";
import {filterByAll, sortByAll} from "shared/helpers/common";
import {parseQuery} from "shared/helpers/jsonapi";
import {ALERT, UX, SOFT} from "shared/constants";
import uxEngApi from "shared/api/uxEng";
import softEngApi from "shared/api/uxEng";

let monkey = Baobab.monkey;

window._state = new Baobab(
  {
    url: {
      route: undefined,
      path: undefined,
      params: {},
      query: {},
    },

    ajaxQueue: [],

    alertQueue: [],
    alertTimeout: undefined,

    uxEngs: {
      // DATA
      total: 0,
      items: {},
      pagination: [],

      // INDEX
      filters: UX.index.filters,
      sorts: UX.index.sorts,
      offset: UX.index.offset,
      limit: UX.index.limit,
      // filterForm ???
      // filterFormErrors ???

      // CRUD
      id: undefined,
      addForm: {},
      addFormErrors: {},
      editForm: {},
      editFormErrors: {},

      // FACETS
      havePendingRequests: monkey([
        ["ajaxQueue"],
        function (queue) {
          return ajaxQueueContains(queue, uxEngApi.indexUrl);
        }
      ]),

      fullLoad: monkey([
        ["uxEngs", "total"],
        ["uxEngs", "pagination"],
        function (total, pagination) {
          let loaded = filter(id => id, pagination).length;
          if (loaded < total) {
            return false;
          } else if (loaded == total) {
            return true;
          } else {
            throw Error(`invalid total ${total}`);
          }
        }
      ]),

      currentItem: monkey([
        ["uxEngs", "items"],
        ["uxEngs", "id"],
        function (items, id) {
          if (id) {
            return items[id];
          } else {
            return undefined;
          }
        }
      ]),

      currentItems: monkey([
        ["uxEngs", "filters"],
        ["uxEngs", "sorts"],
        ["uxEngs", "offset"],
        ["uxEngs", "limit"],
        ["uxEngs", "items"],
        ["uxEngs", "pagination"],
        ["uxEngs", "fullLoad"],
        function (filters, sorts, offset, limit, items, pagination, fullLoad) {
          let itemsArray = map(id => id && items[id], pagination);
          return pipe(
            fullLoad ? filterByAll(filters) : identity,
            fullLoad ? sortByAll(sorts) : identity,
            slice(offset, offset + limit),
            filter(m => m)
          )(itemsArray);
        }
      ]),
    },

    monsters: {
      // DATA
      total: 0,
      items: {},
      pagination: [],

      // INDEX
      filters: MONSTER.index.filters,
      sorts: MONSTER.index.sorts,
      offset: MONSTER.index.offset,
      limit: MONSTER.index.limit,
      // filterForm ???
      // filterFormErrors ???

      // CRUD
      id: undefined,
      addForm: {},
      editForm: {},
      addFormErrors: {},
      editFormErrors: {},

      // FACETS
      havePendingRequests: monkey([
        ["ajaxQueue"],
        function (queue) {
          return ajaxQueueContains(queue, monsterApi.indexUrl);
        }
      ]),

      fullLoad: monkey([
        ["monsters", "total"],
        ["monsters", "pagination"],
        function (total, pagination) {
          let loaded = filter(id => id, pagination).length;
          if (loaded < total) {
            return false;
          } else if (loaded == total) {
            return true;
          } else {
            throw Error(`invalid total ${total}`);
          }
        }
      ]),

      currentItem: monkey([
        ["monsters", "items"],
        ["monsters", "id"],
        function (items, id) {
          if (id) {
            return items[id];
          } else {
            return undefined;
          }
        }
      ]),

      currentItems: monkey([
        ["monsters", "filters"],
        ["monsters", "sorts"],
        ["monsters", "offset"],
        ["monsters", "limit"],
        ["monsters", "items"],
        ["monsters", "pagination"],
        ["monsters", "fullLoad"],
        function (filters, sorts, offset, limit, items, pagination, fullLoad) {
          let itemsArray = map(id => id && items[id], pagination);
          return pipe(
            fullLoad ? filterByAll(filters) : identity,
            fullLoad ? sortByAll(sorts) : identity,
            slice(offset, offset + limit),
            filter(m => m)
          )(itemsArray);
        }
      ]),
    },

    urlQuery: monkey([
      ["url", "query"],
      function (query) {
        let {filters, sorts, offset, limit} = parseQuery(query);
        return {filters, sorts, offset, limit};
      }
    ]),
  },
  { // OPTIONS
    immutable: process.env.NODE_ENV != "production",
  }
);

function ajaxQueueContains(queue, url) {
  return Boolean(filter(pendindRequest => pendindRequest.url.startsWith(url), queue).length);
}

export default window._state;
