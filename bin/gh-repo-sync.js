#!/usr/bin/env node

"use strict";

// const verbose = process.argv.indexOf("--verbose") !== -1;
// const insane = process.argv.indexOf("--insane") !== -1;

process.on("unhandledRejection", (r) => console.log(r));

// if (verbose || insane) {
// process.env.GH_VERBOSE = "true";
// }

// if (insane) {
// process.env.GH_VERBOSE_INSANE = "true";
// }

require("../lib/index.js").run();
