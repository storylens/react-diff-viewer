"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var diff = require("diff");
var DiffType;
(function (DiffType) {
    DiffType[DiffType["DEFAULT"] = 0] = "DEFAULT";
    DiffType[DiffType["ADDED"] = 1] = "ADDED";
    DiffType[DiffType["REMOVED"] = 2] = "REMOVED";
})(DiffType = exports.DiffType || (exports.DiffType = {}));
/**
 * Splits diff text by new line and computes final list of diff lines based on
 * conditions.
 *
 * @param value Diff text from the js diff module.
 */
var constructLines = function (value) {
    var lines = value.split('\n');
    var isAllEmpty = lines.every(function (val) { return !val; });
    if (isAllEmpty) {
        // This is to avoid added an extra new line in the UI.
        if (lines.length === 2) {
            return [];
        }
        lines.pop();
        return lines;
    }
    var lastLine = lines[lines.length - 1];
    var firstLine = lines[0];
    // Remove the first and last element if they are new line character. This is
    // to avoid addition of extra new line in the UI.
    if (!lastLine) {
        lines.pop();
    }
    if (!firstLine) {
        lines.shift();
    }
    return lines;
};
/**
 * Computes word diff information in the line.
 *
 * @param oldValue Old word in the line.
 * @param newValue New word in the line.
 */
var computeWordDiff = function (oldValue, newValue) {
    var diffArray = diff
        .diffChars(oldValue, newValue);
    var wordDiff = {
        left: [],
        right: [],
    };
    diffArray
        .forEach(function (_a) {
        var added = _a.added, removed = _a.removed, value = _a.value;
        var diffInformation = {};
        if (added) {
            diffInformation.type = DiffType.ADDED;
            diffInformation.value = value;
            wordDiff.right.push(diffInformation);
        }
        if (removed) {
            diffInformation.type = DiffType.REMOVED;
            diffInformation.value = value;
            wordDiff.left.push(diffInformation);
        }
        if (!removed && !added) {
            diffInformation.type = DiffType.DEFAULT;
            diffInformation.value = value;
            wordDiff.right.push(diffInformation);
            wordDiff.left.push(diffInformation);
        }
        return diffInformation;
    });
    return wordDiff;
};
/**
 * [TODO]: Think about moving common left and right value assignment to a
 * common place. Better readability?
 *
 * Computes line wise information based in the js diff information passed. Each
 * line contains information about left and right section. Left side denotes
 * deletion and right side denotes addition.
 *
 * @param oldString Old string to compare.
 * @param newString New string to compare with old string.
 * @param disableWordDiff Flag to enable/disable word diff.
 */
var computeLineInformation = function (oldString, newString, disableWordDiff) {
    if (disableWordDiff === void 0) { disableWordDiff = false; }
    var diffArray = diff.diffLines(oldString.trimRight(), newString.trimRight(), {
        newlineIsToken: true,
        ignoreWhitespace: false,
        ignoreCase: false,
    });
    var rightLineNumber = 0;
    var leftLineNumber = 0;
    var lineInformation = [];
    var counter = 0;
    var diffLines = [];
    var ignoreDiffIndexes = [];
    var getLineInformation = function (value, diffIndex, added, removed) {
        if (ignoreDiffIndexes.includes(diffIndex)) {
            return [];
        }
        var lines = constructLines(value);
        return lines.map(function (line) {
            var left = {};
            var right = {};
            if (added || removed) {
                if (!diffLines.includes(counter)) {
                    diffLines.push(counter);
                }
                if (removed) {
                    leftLineNumber += 1;
                    left.lineNumber = leftLineNumber;
                    left.type = DiffType.REMOVED;
                    left.value = line || ' ';
                    // When the current line is of type REMOVED, check the next item in
                    // the diff array whether it is of type ADDED. If true, the current
                    // diff will be marked as both REMOVED and ADDED. Meaning, the
                    // current line is a modification.
                    var nextDiff = diffArray[diffIndex + 1];
                    if (nextDiff && nextDiff.added) {
                        var _a = getLineInformation(nextDiff.value, diffIndex, true)[0].right, rightValue = _a.value, lineNumber = _a.lineNumber, type = _a.type;
                        // When identified as modification, push the next diff to ignore
                        // list as the next value will be added in this line computation as
                        // right and left values.
                        ignoreDiffIndexes.push(diffIndex + 1);
                        right.lineNumber = lineNumber;
                        right.type = type;
                        // Do word level diff and assign the corresponding values to the
                        // left and right diff information object.
                        if (disableWordDiff) {
                            right.value = rightValue;
                        }
                        else {
                            var wordDiff = computeWordDiff(line, rightValue);
                            right.value = wordDiff.right;
                            left.value = wordDiff.left;
                        }
                    }
                }
                else {
                    rightLineNumber += 1;
                    right.lineNumber = rightLineNumber;
                    right.type = DiffType.ADDED;
                    right.value = line;
                }
            }
            else {
                leftLineNumber += 1;
                rightLineNumber += 1;
                left.lineNumber = leftLineNumber;
                left.type = DiffType.DEFAULT;
                left.value = line;
                right.lineNumber = rightLineNumber;
                right.type = DiffType.DEFAULT;
                right.value = line;
            }
            counter += 1;
            return { right: right, left: left };
        });
    };
    diffArray
        .forEach(function (_a, index) {
        var added = _a.added, removed = _a.removed, value = _a.value;
        lineInformation = __spread(lineInformation, getLineInformation(value, index, added, removed));
    });
    return {
        lineInformation: lineInformation, diffLines: diffLines,
    };
};
exports.computeLineInformation = computeLineInformation;
