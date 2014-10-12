'use strict';

var find,
    Retext,
    assert,
    retext,
    TextOM,
    paragraph;

/**
 * Module dependencies.
 */

find = require('./');
Retext = require('retext');
assert = require('assert');

/**
 * Constants.
 */

paragraph = 'Some simple text. Other sentence.';

retext = new Retext().use(find);
TextOM = retext.TextOM;

/**
 * Unit tests.
 */

describe('retext-find()', function () {
    it('should be a `function`', function () {
        assert(typeof find === 'function');
    });
});

function assertChildHasMethod(methodName) {
    assert(typeof new TextOM.Child()[methodName] === 'function');
    assert(typeof new TextOM.Element()[methodName] === 'function');
    assert(typeof new TextOM.Text()[methodName] === 'function');

    assert(typeof new TextOM.ParagraphNode()[methodName] === 'function');
    assert(typeof new TextOM.SentenceNode()[methodName] === 'function');
    assert(typeof new TextOM.WordNode()[methodName] === 'function');
    assert(typeof new TextOM.WhiteSpaceNode()[methodName] === 'function');
    assert(typeof new TextOM.PunctuationNode()[methodName] === 'function');
    assert(typeof new TextOM.TextNode()[methodName] === 'function');
    assert(typeof new TextOM.SourceNode()[methodName] === 'function');
}

function assertParentHasMethod(methodName) {
    assert(typeof new TextOM.Parent()[methodName] === 'function');
    assert(typeof new TextOM.Element()[methodName] === 'function');

    assert(typeof new TextOM.RootNode()[methodName] === 'function');
    assert(typeof new TextOM.ParagraphNode()[methodName] === 'function');
    assert(typeof new TextOM.SentenceNode()[methodName] === 'function');
    assert(typeof new TextOM.WordNode()[methodName] === 'function');
    assert(typeof new TextOM.WhiteSpaceNode()[methodName] === 'function');
    assert(typeof new TextOM.PunctuationNode()[methodName] === 'function');
}

describe('retext-find.attach()', function () {
    it('should be a `function`', function () {
        assert(typeof find.attach === 'function');
    });

    it('should attach a `findParent` method on `Child#`', function () {
        assertChildHasMethod('findParent');
    });

    it('should attach a `findParents` method on `Child#`', function () {
        assertChildHasMethod('findParents');
    });

    it('should attach a `findBefore` method on `Child#`', function () {
        assertChildHasMethod('findBefore');
    });

    it('should attach a `findAllBefore` method on `Child#`', function () {
        assertChildHasMethod('findAllBefore');
    });

    it('should attach a `findAfter` method on `Child#`', function () {
        assertChildHasMethod('findAfter');
    });

    it('should attach a `findAllAfter` method on `Child#`', function () {
        assertChildHasMethod('findAllAfter');
    });

    it('should attach a `findChildren` method on `Parent#`', function () {
        assertParentHasMethod('findChildren');
    });

    it('should attach a `findFirstChild` method on `Parent#`', function () {
        assertParentHasMethod('findFirstChild');
    });

    it('should attach a `findLastChild` method on `Parent#`', function () {
        assertParentHasMethod('findLastChild');
    });
});

describe('Child#findAfter', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findAfter()', function () {
        it('should return the following sibling', function () {
            var result;

            result = tree.head.head[0].findAfter();

            assert(result === tree.head.head[1]);
        });

        it('or null', function () {
            var result;

            result = tree.head.head.tail.findAfter();

            assert(result === null);
        });
    });

    describe('Child#findAfter(type)', function () {
        it('should return the following sibling of type `type`', function () {
            var result;

            result = tree.head.head[0].findAfter(tree.WORD_NODE);

            assert(result === tree.head.head[2]);
        });

        it('or null', function () {
            var result;

            result = tree.head.head[5].findAfter(tree.WORD_NODE);

            assert(result === null);
        });
    });

    describe('Child#findAfter(node)', function () {
        it('should return the following node', function () {
            var result;

            result = tree.head.head[2].findAfter(tree.head.head[5]);

            assert(result === tree.head.head[5]);
        });

        it('or null', function () {
            var result;

            result = tree.head.head[2].findAfter(tree.head.head[1]);

            assert(result === null);
        });
    });
});

describe('Child#findBefore', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findBefore()', function () {
        it('should return the preceding sibling', function () {
            var result;

            result = tree.head.head.tail.findBefore();

            assert(result === tree.head.head.tail.prev);
        });

        it('or null', function () {
            var result;

            result = tree.head.head.head.findBefore();

            assert(result === null);
        });
    });

    describe('Child#findBefore(type)', function () {
        it('should return the preceding sibling of type `type`', function () {
            var result;

            result = tree.head.head.tail.findBefore(tree.WHITE_SPACE_NODE);

            assert(result === tree.head.head.tail.prev.prev);
        });

        it('or null', function () {
            var result;

            result = tree.head.head[1].findBefore(tree.WHITE_SPACE_NODE);

            assert(result === null);
        });
    });

    describe('Child#findBefore(node)', function () {
        it('should return the preceding node', function () {
            var result;

            result = tree.head.head[3].findBefore(tree.head.head[1]);

            assert(result === tree.head.head[1]);
        });

        it('or null', function () {
            var result;

            result = tree.head.head[3].findBefore(tree.head.head[5]);

            assert(result === null);
        });
    });
});

describe('Child#findAllAfter', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findAllAfter()', function () {
        it('should return following siblings', function () {
            var result;

            result = tree.head.head[2].findAllAfter();

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[3]);
            assert(result[1] === tree.head.head[4]);
            assert(result[2] === tree.head.head[5]);
            assert(result[3] === undefined);
        });
    });

    describe('Child#findAllAfter(type)', function () {
        it('should return following siblings of type `type`', function () {
            var result;

            result = tree.head.head[2].findAllAfter(tree.WORD_NODE);

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[4]);
            assert(result[1] === undefined);
        });
    });
});

describe('Child#findAllBefore', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findAllBefore()', function () {
        it('should return preceding siblings', function () {
            var result;

            result = tree.head.head[2].findAllBefore();

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[1]);
            assert(result[1] === tree.head.head[0]);
            assert(result[2] === undefined);
        });
    });

    describe('Child#findAllBefore(type)', function () {
        it('should return preceding siblings of type `type`', function () {
            var result;

            result = tree.head.head[3].findAllBefore(tree.WORD_NODE);

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[2]);
            assert(result[1] === tree.head.head[0]);
            assert(result[2] === undefined);
        });
    });
});

describe('Child#findParent', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findParent()', function () {
        it('should return the parent', function () {
            var result;

            result = tree.head.head.head.findParent();

            assert(result === tree.head.head);
        });

        it('or null', function () {
            var node;

            node = tree.head.head.tail;

            node.remove();

            assert(node.findParent() === null);
        });
    });

    describe('Child#findParent(type)', function () {
        it('should return the ancestor of type `type`', function () {
            var result;

            result = tree.head.head.head.findParent(tree.ROOT_NODE);

            assert(result === tree);
        });

        it('or null', function () {
            var result;

            result = tree.head.head.head.findParent(tree.TEXT_NODE);

            assert(result === null);
        });
    });

    describe('Child#findParent(node)', function () {
        it('should return the ancestor node', function () {
            var result;

            result = tree.head.head[2].findParent(tree.head);

            assert(result === tree.head);
        });

        it('or null', function () {
            var result;

            result = tree.head.findParent(tree.head.head);

            assert(result === null);
        });
    });
});

describe('Child#findParents', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findParents()', function () {
        it('should return the parents', function () {
            var result;

            result = tree.head.head.findParents();

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head);
            assert(result[1] === tree);
            assert(result[2] === undefined);
        });
    });

    describe('Child#findParents(type)', function () {
        it('should return the ancestor of type `type`', function () {
            var result;

            result = tree.head.head.head.findParents(tree.ROOT_NODE);

            assert(Array.isArray(result) === true);
            assert(result[0] === tree);
            assert(result[1] === undefined);
        });
    });
});

describe('Parent#findFirstChild', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findFirstChild()', function () {
        it('should return the first child', function () {
            assert(tree.head.head.findFirstChild() === tree.head.head.head);
        });
    });

    describe('Child#findFirstChild(type)', function () {
        it('should return the first child of type `type`', function () {
            assert(
                tree.head.head.findFirstChild(tree.PUNCTUATION_NODE) ===
                tree.head.head.tail
            );
        });
    });
});

describe('Parent#findLastChild', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findLastChild()', function () {
        it('should return the first child', function () {
            assert(tree.head.head.findLastChild() === tree.head.head.tail);
        });
    });

    describe('Child#findLastChild(type)', function () {
        it('should return the first child of type `type`', function () {
            assert(
                tree.head.head.findLastChild(tree.WORD_NODE) ===
                tree.head.head[4]
            );
        });
    });
});

describe('Child#findChildren', function () {
    var tree;

    before(function (done) {
        retext.parse(paragraph, function (err, node) {
            tree = node;

            done(err);
        });
    });

    describe('Child#findChildren()', function () {
        it('should return children', function () {
            var result;

            result = tree.head.head.findChildren();

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[0]);
            assert(result[1] === tree.head.head[1]);
            assert(result[2] === tree.head.head[2]);
            assert(result[3] === tree.head.head[3]);
            assert(result[4] === tree.head.head[4]);
            assert(result[5] === tree.head.head[5]);
            assert(result[6] === undefined);
        });
    });

    describe('Child#findChildren(type)', function () {
        it('should return children of type `type`', function () {
            var result;

            result = tree.head.head.findChildren(tree.WORD_NODE);

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[0]);
            assert(result[1] === tree.head.head[2]);
            assert(result[2] === tree.head.head[4]);
            assert(result[3] === undefined);

            result = tree.head.head.findChildren(tree.PUNCTUATION_NODE);

            assert(Array.isArray(result) === true);
            assert(result[0] === tree.head.head[5]);
            assert(result[1] === undefined);
        });
    });
});
