// INDEX
import loadIndex from "frontend/actions/load-index/softEng";
import fetchIndex from "frontend/actions/fetch-index/softEng";

// CRUD
import establishItem from "frontend/actions/establish-item/softEng";
import loadItem from "frontend/actions/load-item/softEng";
import fetchItem from "frontend/actions/fetch-item/softEng";
import addItem from "frontend/actions/add-item/softEng";
import editItem from "frontend/actions/edit-item/softEng";
import removeItem from "frontend/actions/remove-item/softEng";
import {updateAddForm, validateAddForm, resetAddForm} from "frontend/actions/form/softEng";
import {updateEditForm, validateEditForm, resetEditForm} from "frontend/actions/form/softEng";

// TODO: syntax can be simplified with re-exports (wait for proper IDE support)
export default {
  // INDEX
  loadIndex, fetchIndex,

  // CRUD
  establishItem, loadItem, fetchItem, addItem, editItem, removeItem,
  updateAddForm, validateAddForm, resetAddForm,
  updateEditForm, validateEditForm, resetEditForm,
};
