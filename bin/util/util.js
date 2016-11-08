"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const moment = require("moment");
function parseJson(text) {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        throw new Error(`${err.message} due to JSON: ${text}`);
    }
}
exports.parseJson = parseJson;
function currentTimeStamp() {
    return moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
}
exports.currentTimeStamp = currentTimeStamp;
function nAtATime(n, inputs, use) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = new Array(inputs.length);
        // We have n "threads" which each run `continuouslyWork`.
        // They all share `nextIndex`, so each work item is done only once.
        let nextIndex = 0;
        yield Promise.all(initArray(n, () => __awaiter(this, void 0, void 0, function* () {
            while (nextIndex !== inputs.length) {
                const index = nextIndex;
                nextIndex++;
                results[index] = yield use(inputs[index]);
            }
        })));
        return results;
    });
}
exports.nAtATime = nAtATime;
function filterAsyncOrdered(arr, shouldKeep) {
    return __awaiter(this, void 0, void 0, function* () {
        const shouldKeeps = yield Promise.all(arr.map(shouldKeep));
        return arr.filter((_, idx) => shouldKeeps[idx]);
    });
}
exports.filterAsyncOrdered = filterAsyncOrdered;
function mapAsyncOrdered(arr, mapper) {
    return __awaiter(this, void 0, void 0, function* () {
        const out = new Array(arr.length);
        yield Promise.all(arr.map((em, idx) => __awaiter(this, void 0, void 0, function* () {
            out[idx] = yield mapper(em);
        })));
        return out;
    });
}
exports.mapAsyncOrdered = mapAsyncOrdered;
function indent(str) {
    return "\t" + str.replace(/\n/g, "\n\t");
}
exports.indent = indent;
function stripQuotes(s) {
    if (s[0] === '"' || s[0] === "'") {
        return s.substr(1, s.length - 2);
    }
    else {
        throw new Error(`${s} is not quoted`);
    }
}
exports.stripQuotes = stripQuotes;
function unique(arr) {
    return [...new Set(arr)];
}
exports.unique = unique;
function done(promise) {
    promise.catch(console.error);
}
exports.done = done;
function initArray(length, makeElement) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = makeElement();
    }
    return arr;
}
function normalizeSlashes(path) {
    return path.replace(/\\/g, "/");
}
exports.normalizeSlashes = normalizeSlashes;
function hasOwnProperty(object, propertyName) {
    return Object.prototype.hasOwnProperty.call(object, propertyName);
}
exports.hasOwnProperty = hasOwnProperty;
function intOfString(str) {
    const n = Number.parseInt(str, 10);
    if (Number.isNaN(n)) {
        throw new Error(`Error in parseInt(${JSON.stringify(str)})`);
    }
    return n;
}
exports.intOfString = intOfString;
function sortObjectKeys(data) {
    const out = {};
    for (const key of Object.keys(data).sort()) {
        out[key] = data[key];
    }
    return out;
}
exports.sortObjectKeys = sortObjectKeys;
//# sourceMappingURL=util.js.map