// INDEX
import establishIndex from "frontend/actions/establish-index/uxEng";
import loadIndex from "frontend/actions/load-index/uxEng";
import fetchIndex from "frontend/actions/fetch-index/uxEng";

// CRUD
import establishItem from "frontend/actions/establish-item/uxEng";
import loadItem from "frontend/actions/load-item/uxEng";
import fetchItem from "frontend/actions/fetch-item/uxEng";
import addItem from "frontend/actions/add-item/uxEng";
import editItem from "frontend/actions/edit-item/uxEng";
import removeItem from "frontend/actions/remove-item/uxEng";
import {updateAddForm, validateAddForm, resetAddForm} from "frontend/actions/form/uxEng";
import {updateEditForm, validateEditForm, resetEditForm} from "frontend/actions/form/uxEng";

// TODO: syntax can be simplified with re-exports (wait for proper IDE support)
export default {
  // INDEX
  establishIndex, loadIndex, fetchIndex,

  // CRUD
  establishItem, loadItem, fetchItem, addItem, editItem, removeItem,
  updateAddForm, validateAddForm, resetAddForm,
  updateEditForm, validateEditForm, resetEditForm,
};
