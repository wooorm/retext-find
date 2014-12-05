'use strict';

var Retext,
    retextFind;

/**
 * Dependencies.
 */

Retext = require('retext');
retextFind = require('./');

/**
 * Dependencies.
 */

var retext;

retext = new Retext().use(retextFind);

/**
 * Test data: A (big?) article (w/ 100 paragraphs, 500
 * sentences, 10,000 words);
 *
 * Source:
 *   http://www.gutenberg.org/files/10745/10745-h/10745-h.htm
 */

var sentence,
    paragraph,
    section,
    article;

sentence = 'Where she had stood was clear, and she was gone since Sir ' +
    'Kay does not choose to assume my quarrel.';

paragraph = 'Thou art a churlish knight to so affront a lady ' +
    'he could not sit upon his horse any longer. ' +
    'For methinks something hath befallen my lord and that he ' +
    'then, after a while, he cried out in great voice. ' +
    'For that light in the sky lieth in the south ' +
    'then Queen Helen fell down in a swoon, and lay. ' +
    'Touch me not, for I am not mortal, but Fay ' +
    'so the Lady of the Lake vanished away, everything behind. ' +
    sentence;

section = paragraph + Array(10).join('\n\n' + paragraph);

article = section + Array(10).join('\n\n' + section);

before(function (done) {
    retext.parse(article, function (err, node) {
        article = node;

        done(err);
    });
});

before(function (done) {
    retext.parse(section, function (err, node) {
        section = node;

        done(err);
    });
});

suite('find all paragraphs before a document\'s last paragraph', function () {
    bench('A section', function () {
        section.tail.findAllBefore(section.PARAGRAPH_NODE);
    });

    bench('An article', function () {
        article.tail.findAllBefore(article.PARAGRAPH_NODE);
    });
});

suite('find all paragraphs after a document\'s first paragraph', function () {
    bench('A section', function () {
        section.head.findAllAfter(section.PARAGRAPH_NODE);
    });

    bench('An article', function () {
        article.head.findAllAfter(article.PARAGRAPH_NODE);
    });
});

suite('find the first white space in a document', function () {
    bench('A section', function () {
        section.findFirstChild(section.WHITE_SPACE_NODE);
    });

    bench('An article', function () {
        article.findFirstChild(article.WHITE_SPACE_NODE);
    });
});

suite('find the last white space in a document', function () {
    bench('A section', function () {
        section.findLastChild(section.WHITE_SPACE_NODE);
    });

    bench('An article', function () {
        article.findLastChild(article.WHITE_SPACE_NODE);
    });
});
