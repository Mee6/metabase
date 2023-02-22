// There's code included from the Google Closure Library in the CLJS output
// that TypeScript can't parse. This breaks the `tsc --noEmit` we use for
// `yarn type-check`.
// This file tweaks the troublesome code to use a `\u2029` escape instead of the
// literal character, avoiding this issue.
// Once the GCL used by the CLJS compiler is updated to include this patch
// https://github.com/google/closure-library/commit/468188f4dc0d6fd756a142f2c7b72777fc0ebcb4
// this can be removed.

const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "..", "src", "cljs", "cljs_env.js");
const contents = fs.readFileSync(filename, { encoding: "utf8" });
const updated = contents.replace(/"\u{2029}"/u, '"\\u2029"');
fs.writeFileSync(filename, updated, { encoding: "utf8" });
