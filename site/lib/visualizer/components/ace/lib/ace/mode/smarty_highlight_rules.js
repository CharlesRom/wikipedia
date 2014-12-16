/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/* This file was autogenerated from https://raw.github.com/amitsnyderman/sublime-smarty/master/Syntaxes/Smarty.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/

define(function(require, exports, module) {


var oop = require("../lib/oop");
var HtmlHighlightRules = require("./html_highlight_rules").HtmlHighlightRules;

var SmartyHighlightRules = function() {
    HtmlHighlightRules.call(this);
    var smartyRules = { start: 
       [ { include: '#comments' },
         { include: '#blocks' } ],
      '#blocks': 
       [ { token: 'punctuation.section.embedded.begin.smarty',
           regex: '\\{%?',
           push: 
            [ { token: 'punctuation.section.embedded.end.smarty',
                regex: '%?\\}',
                next: 'pop' },
              { include: '#strings' },
              { include: '#variables' },
              { include: '#lang' },
              { defaultToken: 'source.smarty' } ] } ],
      '#comments': 
       [ { token: 
            [ 'punctuation.definition.comment.smarty',
              'comment.block.smarty' ],
           regex: '(\\{%?)(\\*)',
           push: 
            [ { token: 'comment.block.smarty', regex: '\\*%?\\}', next: 'pop' },
              { defaultToken: 'comment.block.smarty' } ] } ],
      '#lang': 
       [ { token: 'keyword.operator.smarty',
           regex: '(?:!=|!|<=|>=|<|>|===|==|%|&&|\\|\\|)|\\b(?:and|or|eq|neq|ne|gte|gt|ge|lte|lt|le|not|mod)\\b' },
         { token: 'constant.language.smarty',
           regex: '\\b(?:TRUE|FALSE|true|false)\\b' },
         { token: 'keyword.control.smarty',
           regex: '\\b(?:if|else|elseif|foreach|foreachelse|section|switch|case|break|default)\\b' },
         { token: 'variable.parameter.smarty', regex: '\\b[a-zA-Z]+=' },
         { token: 'support.function.built-in.smarty',
           regex: '\\b(?:capture|config_load|counter|cycle|debug|eval|fetch|include_php|include|insert|literal|math|strip|rdelim|ldelim|assign|constant|block|html_[a-z_]*)\\b' },
         { token: 'support.function.variable-modifier.smarty',
           regex: '\\|(?:capitalize|cat|count_characters|count_paragraphs|count_sentences|count_words|date_format|default|escape|indent|lower|nl2br|regex_replace|replace|spacify|string_format|strip_tags|strip|truncate|upper|wordwrap)' } ],
      '#strings': 
       [ { token: 'punctuation.definition.string.begin.smarty',
           regex: '\'',
           push: 
            [ { token: 'punctuation.definition.string.end.smarty',
                regex: '\'',
                next: 'pop' },
              { token: 'constant.character.escape.smarty', regex: '\\\\.' },
              { defaultToken: 'string.quoted.single.smarty' } ] },
         { token: 'punctuation.definition.string.begin.smarty',
           regex: '"',
           push: 
            [ { token: 'punctuation.definition.string.end.smarty',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.smarty', regex: '\\\\.' },
              { defaultToken: 'string.quoted.double.smarty' } ] } ],
      '#variables': 
       [ { token: 
            [ 'punctuation.definition.variable.smarty',
              'variable.other.global.smarty' ],
           regex: '\\b(\\$)(Smarty\\.)' },
         { token: 
            [ 'punctuation.definition.variable.smarty',
              'variable.other.smarty' ],
           regex: '(\\$)([a-zA-Z_][a-zA-Z0-9_]*)\\b' },
         { token: [ 'keyword.operator.smarty', 'variable.other.property.smarty' ],
           regex: '(->)([a-zA-Z_][a-zA-Z0-9_]*)\\b' },
         { token: 
            [ 'keyword.operator.smarty',
              'meta.function-call.object.smarty',
              'punctuation.definition.variable.smarty',
              'variable.other.smarty',
              'punctuation.definition.variable.smarty' ],
           regex: '(->)([a-zA-Z_][a-zA-Z0-9_]*)(\\()(.*?)(\\))' } ] }
    
    var smartyStart = smartyRules.start;
    
    for (var rule in this.$rules) {
        this.$rules[rule].unshift.apply(this.$rules[rule], smartyStart);
    }
    
    Object.keys(smartyRules).forEach(function(x) {
        if (!this.$rules[x])
            this.$rules[x] = smartyRules[x];
    }, this);
    
    this.normalizeRules();
};

SmartyHighlightRules.metaData = { fileTypes: [ 'tpl' ],
      foldingStartMarker: '\\{%?',
      foldingStopMarker: '%?\\}',
      name: 'Smarty',
      scopeName: 'text.html.smarty' }


oop.inherits(SmartyHighlightRules, HtmlHighlightRules);

exports.SmartyHighlightRules = SmartyHighlightRules;
});