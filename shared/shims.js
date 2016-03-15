import {map} from "ramda";

RegExp.escape = function(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

if (typeof process == "object") {
  process.on("unhandledRejection", (reason, promise) => {
    throw reason;
  });
}
