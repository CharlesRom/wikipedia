"use strict";define(["mime-types"],function(a){return{lookup:function(b,c){var d=a.lookup(b);return!d&&/\.j?dx$/i.test(b)&&(d="chemical/x-jcamp-dx"),d||(d=c),d}}});