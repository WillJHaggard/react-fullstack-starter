import Tc from "tcomb";

let Uid = Tc.subtype(Tc.String, function (x) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(x);
}, "Uid");

let AlertCategory = Tc.enums.of(["success", "error", "info", "warning"], "AlertCategory");

let Alert = Tc.struct({
  id: Uid,
  message: Tc.String,
  category: AlertCategory,
  closable: Tc.Boolean,
  expire: Tc.Number,
}, "Alert");

let uxEngName = Tc.subtype(Tc.String, x => {
  return x.length >= 2 && x.length <= 100;
}, "uxEngName");

let uxEngManufacturer = Tc.enums.of(["China", "Russia", "USA"], "uxEngManufacturer");

let uxEng = Tc.struct({
  id: Uid,
  name: uxEngName,
  manufacturer: uxEngManufacturer,
  assemblyDate: Tc.Date,
}, "uxEng");

let softEngName = Tc.subtype(Tc.String, x => {
  return x.length >= 2 && x.length <= 100;
}, "softEngName");

let softEngCitizenship = Tc.enums.of(["China", "Russia", "USA"], "softEngCitizenship");

let softEng = Tc.struct({
  id: Uid,
  name: softEngName,
  citizenship: softEngCitizenship,
  birthDate: Tc.Date,
}, "softEng");

export default {
  Uid, Alert, uxEng, softEng,
};
