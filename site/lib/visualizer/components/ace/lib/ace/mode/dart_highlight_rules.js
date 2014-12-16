/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: 958518BC-799F-477A-99F9-5B28EBF230F6) */


define(function(require, exports, module) {


var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DartHighlightRules = function() {

    var constantLanguage = "true|false|null";
    var variableLanguage = "this|super";
    var keywordControl = "try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new";
    var keywordDeclaration = "abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with";
    var storageModifier = "static|final|const";
    var storageType = "void|bool|num|int|double|dynamic|var|String";

    var keywordMapper = this.createKeywordMapper({
        "constant.language.dart": constantLanguage,
        "variable.language.dart": variableLanguage,
        "keyword.control.dart": keywordControl,
        "keyword.declaration.dart": keywordDeclaration,
        "storage.modifier.dart": storageModifier,
        "storage.type.primitive.dart": storageType
    }, "identifier");

    var stringfill = {
        token : "string",
        regex : ".+"
    };

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = 
        {
    "start": [
        {
            token : "comment",
            regex : /\/\/.*$/
        },
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
        },
        {
            token: ["meta.preprocessor.script.dart"],
            regex: "^(#!.*)$"
        },
        {
            token: "keyword.other.import.dart",
            regex: "(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"
        },
        {
            token : ["keyword.other.import.dart", "text"],
            regex : "(?:\\b)(prefix)(\\s*:)"
        },
        {
            regex: "\\bas\\b",
            token: "keyword.cast.dart"
        },
        {
            regex: "\\?|:",
            token: "keyword.control.ternary.dart"
        },
        {
            regex: "(?:\\b)(is\\!?)(?:\\b)",
            token: ["keyword.operator.dart"]
        },
        {
            regex: "(<<|>>>?|~|\\^|\\||&)",
            token: ["keyword.operator.bitwise.dart"]
        },
        {
            regex: "((?:&|\\^|\\||<<|>>>?)=)",
            token: ["keyword.operator.assignment.bitwise.dart"]
        },
        {
            regex: "(===?|!==?|<=?|>=?)",
            token: ["keyword.operator.comparison.dart"]
        },
        {
            regex: "((?:[+*/%-]|\\~)=)",
            token: ["keyword.operator.assignment.arithmetic.dart"]
        },
        {
            regex: "=",
            token: "keyword.operator.assignment.dart"
        },
        {
            token : "string",
            regex : "'''",
            next : "qdoc"
        }, 
        {
            token : "string",
            regex : '"""',
            next : "qqdoc"
        }, 
        {
            token : "string",
            regex : "'",
            next : "qstring"
        }, 
        {
            token : "string",
            regex : '"',
            next : "qqstring"
        }, 
        {
            regex: "(\\-\\-|\\+\\+)",
            token: ["keyword.operator.increment-decrement.dart"]
        },
        {
            regex: "(\\-|\\+|\\*|\\/|\\~\\/|%)",
            token: ["keyword.operator.arithmetic.dart"]
        },
        {
            regex: "(!|&&|\\|\\|)",
            token: ["keyword.operator.logical.dart"]
        },
        {
            token : "constant.numeric", // hex
            regex : "0[xX][0-9a-fA-F]+\\b"
        }, 
        {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, 
        {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }
    ],
    "comment" : [
        {
            token : "comment", // closing comment
            regex : ".*?\\*\\/",
            next : "start"
        }, {
            token : "comment", // comment spanning whole line
            regex : ".+"
        }
    ],
    "qdoc" : [
        {
            token : "string",
            regex : ".*?'''",
            next : "start"
        }, stringfill],

    "qqdoc" : [
        {
            token : "string",
            regex : '.*?"""',
            next : "start"
        }, stringfill],

    "qstring" : [
        {
            token : "string",
            regex : "[^\\\\']*(?:\\\\.[^\\\\']*)*'",
            next : "start"
        }, stringfill],

    "qqstring" : [
        {
            token : "string",
            regex : '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
            next : "start"
        }, stringfill]
}

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(DartHighlightRules, TextHighlightRules);

exports.DartHighlightRules = DartHighlightRules;
});
