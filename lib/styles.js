"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

var emotion_1 = require("emotion");

exports["default"] = function(styleOverride) {
  var _emotion_1$css, _emotion_1$css3;

  var overrideVariables = styleOverride.variables,
    styles = _objectWithoutProperties(styleOverride, ["variables"]);

  var variables = _objectSpread(
    {},
    {
      diffViewerBackground: "#fff",
      addedBackground: "#e6ffed",
      addedColor: "#24292e",
      removedBackground: "#ffeef0",
      removedColor: "#24292e",
      wordAddedBackground: "#acf2bd",
      wordRemovedBackground: "#fdb8c0",
      addedGutterBackground: "#cdffd8",
      removedGutterBackground: "#ffdce0",
      gutterBackground: "#f7f7f7",
      gutterBackgroundDark: "#f3f1f1",
      highlightBackground: "#fffbdd",
      highlightGutterBackground: "#fff5b1",
      codeFoldGutterBackground: "#dbedff",
      codeFoldBackground: "#f1f8ff",
      emptyLineBackground: "#fafbfc"
    },
    {},
    overrideVariables
  );

  var diffContainer = emotion_1.css({
    width: "100%",
    background: variables.diffViewerBackground,
    pre: {
      margin: 0,
      whiteSpace: "pre-wrap",
      lineHeight: "25px"
    },
    label: "diff-container"
  });
  var diffRemoved = emotion_1.css({
    background: variables.removedBackground,
    color: variables.removedColor,
    pre: {
      color: variables.removedColor
    },
    label: "diff-removed"
  });
  var diffAdded = emotion_1.css({
    background: variables.addedBackground,
    color: variables.addedColor,
    pre: {
      color: variables.addedColor
    },
    label: "diff-added"
  });
  var wordDiff = emotion_1.css({
    padding: 2,
    display: "inline-flex",
    borderRadius: 1,
    label: "word-diff"
  });
  var wordAdded = emotion_1.css({
    background: variables.wordAddedBackground,
    label: "word-added"
  });
  var wordRemoved = emotion_1.css({
    background: variables.wordRemovedBackground,
    label: "word-removed"
  });
  var codeFoldGutter = emotion_1.css({
    backgroundColor: variables.codeFoldGutterBackground,
    label: "code-fold-gutter"
  });
  var codeFold = emotion_1.css({
    backgroundColor: variables.codeFoldBackground,
    height: 40,
    fontSize: 14,
    fontWeight: 700,
    label: "code-fold",
    a: {
      textDecoration: "underline !important",
      cursor: "pointer",
      pre: {
        display: "inline"
      }
    }
  });
  var emptyLine = emotion_1.css({
    backgroundColor: variables.emptyLineBackground,
    label: "empty-line"
  });
  var marker = emotion_1.css(
    ((_emotion_1$css = {
      width: 25,
      paddingLeft: 10,
      userSelect: "none",
      label: "marker"
    }),
    _defineProperty(_emotion_1$css, "&.".concat(diffAdded), {
      pre: {
        color: variables.addedColor
      }
    }),
    _defineProperty(_emotion_1$css, "&.".concat(diffRemoved), {
      pre: {
        color: variables.removedColor
      }
    }),
    _emotion_1$css)
  );
  var highlightedLine = emotion_1.css(
    _defineProperty(
      {
        background: variables.highlightBackground,
        label: "highlighted-line"
      },
      ".".concat(wordAdded, ", .").concat(wordRemoved),
      {
        backgroundColor: "initial"
      }
    )
  );
  var highlightedGutter = emotion_1.css({
    label: "highlighted-gutter"
  });
  var gutter = emotion_1.css(
    ((_emotion_1$css3 = {
      userSelect: "none",
      minWidth: 40,
      padding: "0 10px",
      label: "gutter",
      textAlign: "right",
      background: variables.gutterBackground,
      "&:hover": {
        cursor: "pointer",
        background: variables.gutterBackgroundDark,
        pre: {
          opacity: 1
        }
      },
      pre: {
        opacity: 0.5
      }
    }),
    _defineProperty(_emotion_1$css3, "&.".concat(diffAdded), {
      background: variables.addedGutterBackground
    }),
    _defineProperty(_emotion_1$css3, "&.".concat(diffRemoved), {
      background: variables.removedGutterBackground
    }),
    _defineProperty(_emotion_1$css3, "&.".concat(highlightedGutter), {
      background: variables.highlightGutterBackground,
      "&:hover": {
        background: variables.highlightGutterBackground
      }
    }),
    _emotion_1$css3)
  );
  var emptyGutter = emotion_1.css({
    "&:hover": {
      background: variables.gutterBackground,
      cursor: "initial"
    },
    label: "empty-gutter"
  });
  var line = emotion_1.css({
    verticalAlign: "baseline",
    label: "line"
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
    emptyLine: emptyLine
  };
  var computerOverrideStyles = Object.keys(styles).reduce(function(acc, key) {
    return _objectSpread(
      {},
      acc,
      {},
      _defineProperty({}, key, emotion_1.css(styles[key]))
    );
  }, {});
  return Object.keys(defaultStyles).reduce(function(acc, key) {
    return _objectSpread(
      {},
      acc,
      {},
      _defineProperty(
        {},
        key,
        computerOverrideStyles[key]
          ? emotion_1.cx(defaultStyles[key], computerOverrideStyles[key])
          : defaultStyles[key]
      )
    );
  }, {});
};
