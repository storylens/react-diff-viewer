"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var emotion_1 = require("emotion");
exports.default = (function (styleOverride) {
    var _a, _b, _c;
    var overrideVariables = styleOverride.variables, styles = __rest(styleOverride, ["variables"]);
    var variables = __assign({
        diffViewerBackground: '#fff',
        addedBackground: '#e6ffed',
        addedColor: '#24292e',
        removedBackground: '#ffeef0',
        removedColor: '#24292e',
        wordAddedBackground: '#acf2bd',
        wordRemovedBackground: '#fdb8c0',
        addedGutterBackground: '#cdffd8',
        removedGutterBackground: '#ffdce0',
        gutterBackground: '#f7f7f7',
        gutterBackgroundDark: '#f3f1f1',
        highlightBackground: '#fffbdd',
        highlightGutterBackground: '#fff5b1',
        codeFoldGutterBackground: '#dbedff',
        codeFoldBackground: '#f1f8ff',
        emptyLineBackground: '#fafbfc',
    }, overrideVariables);
    var diffContainer = emotion_1.css({
        width: '100%',
        background: variables.diffViewerBackground,
        pre: {
            margin: 0,
            whiteSpace: 'pre-wrap',
            lineHeight: '25px',
        },
        label: 'diff-container',
    });
    var diffRemoved = emotion_1.css({
        background: variables.removedBackground,
        color: variables.removedColor,
        pre: {
            color: variables.removedColor,
        },
        label: 'diff-removed',
    });
    var diffAdded = emotion_1.css({
        background: variables.addedBackground,
        color: variables.addedColor,
        pre: {
            color: variables.addedColor,
        },
        label: 'diff-added',
    });
    var wordDiff = emotion_1.css({
        padding: 2,
        display: 'inline-flex',
        borderRadius: 1,
        label: 'word-diff',
    });
    var wordAdded = emotion_1.css({
        background: variables.wordAddedBackground,
        label: 'word-added',
    });
    var wordRemoved = emotion_1.css({
        background: variables.wordRemovedBackground,
        label: 'word-removed',
    });
    var codeFoldGutter = emotion_1.css({
        backgroundColor: variables.codeFoldGutterBackground,
        label: 'code-fold-gutter',
    });
    var codeFold = emotion_1.css({
        backgroundColor: variables.codeFoldBackground,
        height: 40,
        fontSize: 14,
        fontWeight: 700,
        label: 'code-fold',
        a: {
            textDecoration: 'underline !important',
            cursor: 'pointer',
            pre: {
                display: 'inline',
            },
        },
    });
    var emptyLine = emotion_1.css({
        backgroundColor: variables.emptyLineBackground,
        label: 'empty-line',
    });
    var marker = emotion_1.css((_a = {
            width: 25,
            paddingLeft: 10,
            userSelect: 'none',
            label: 'marker'
        },
        _a["&." + diffAdded] = {
            pre: {
                color: variables.addedColor,
            },
        },
        _a["&." + diffRemoved] = {
            pre: {
                color: variables.removedColor,
            },
        },
        _a));
    var highlightedLine = emotion_1.css((_b = {
            background: variables.highlightBackground,
            label: 'highlighted-line'
        },
        _b["." + wordAdded + ", ." + wordRemoved] = {
            backgroundColor: 'initial',
        },
        _b));
    var highlightedGutter = emotion_1.css({
        label: 'highlighted-gutter',
    });
    var gutter = emotion_1.css((_c = {
            userSelect: 'none',
            minWidth: 40,
            padding: '0 10px',
            label: 'gutter',
            textAlign: 'right',
            background: variables.gutterBackground,
            '&:hover': {
                cursor: 'pointer',
                background: variables.gutterBackgroundDark,
                pre: {
                    opacity: 1,
                },
            },
            pre: {
                opacity: 0.5,
            }
        },
        _c["&." + diffAdded] = {
            background: variables.addedGutterBackground,
        },
        _c["&." + diffRemoved] = {
            background: variables.removedGutterBackground,
        },
        _c["&." + highlightedGutter] = {
            background: variables.highlightGutterBackground,
            '&:hover': {
                background: variables.highlightGutterBackground,
            },
        },
        _c));
    var emptyGutter = emotion_1.css({
        '&:hover': {
            background: variables.gutterBackground,
            cursor: 'initial',
        },
        label: 'empty-gutter',
    });
    var line = emotion_1.css({
        verticalAlign: 'baseline',
        label: 'line',
    });
    var defaultStyles = {
        diffContainer: diffContainer,
        diffRemoved: diffRemoved,
        diffAdded: diffAdded,
        marker: marker,
        highlightedGutter: highlightedGutter,
        highlightedLine: highlightedLine,
        gutter: gutter,
        line: line,
        wordDiff: wordDiff,
        wordAdded: wordAdded,
        wordRemoved: wordRemoved,
        codeFoldGutter: codeFoldGutter,
        codeFold: codeFold,
        emptyGutter: emptyGutter,
        emptyLine: emptyLine,
    };
    var computerOverrideStyles = Object.keys(styles)
        .reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {},
            _a[key] = emotion_1.css(styles[key]),
            _a)));
    }, {});
    return Object.keys(defaultStyles)
        .reduce(function (acc, key) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {},
            _a[key] = computerOverrideStyles[key]
                ? emotion_1.cx(defaultStyles[key], computerOverrideStyles[key])
                : defaultStyles[key],
            _a)));
    }, {});
});
