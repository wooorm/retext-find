# retext-find [![Build Status](https://travis-ci.org/wooorm/retext-find.svg?branch=master)](https://travis-ci.org/wooorm/retext-find) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-find.svg)](https://coveralls.io/r/wooorm/retext-find?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** node finder.

## Installation

npm:
```sh
$ npm install retext-find
```

Component:
```sh
$ component install wooorm/retext-find
```

Bower:
```sh
$ bower install retext-find
```

## Usage

```js
var Retext,
    retext,
    find;

Retext = require('retext');
find = require('retext-find');

retext = new Retext().use(find);

/**
 * See each method below.
 */
```

## API

### `test`

All methods below accept an optional `test` as their argument.

- If a string is passed, only nodes of that type are returned;
- If a node is passed, only that node is returned.

The first makes it easy to find only nodes of a certain type (such as words), the later makes it easy to detect if a given node is indeed before, after, inside, or attached to the operated on node.

### Child#findBefore(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.tail.findBefore(tree.PARAGRAPH_NODE);

    console.log(node.type, node.toString());
    /**
     * 'ParagraphNode', 'Some simple text.'
     */
});
```

Find the first preceding sibling that passes `test`, `child.prev` if `test` is omitted, or `null`.

### Child#findAfter(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.findAfter(tree.WHITE_SPACE_NODE);

    console.log(node.type, node.toString());
    /**
     * 'WhiteSpaceNode', '\n\n'
     */
});
```

Find the first following sibling that passes `test`, `child.next` if `test` is omitted, or `null`.

### Child#findBeforeUpwards(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.tail.head.head.findBeforeUpwards();

    console.log(node.type, node.toString());
    /**
     * 'WhiteSpaceNode', '\n\n'
     */
});
```

Find the first node directly before an ancestor that passes `test`, or `null`.

### Child#findAfterUpwards(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.head.tail.findAfterUpwards();

    console.log(node.type, node.toString());
    /**
     * 'WhiteSpaceNode', '\n\n'
     */
});
```

Find the first node directly after an ancestor that passes `test`, or `null`.

### Child#findAfter(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.findAfter(tree.WHITE_SPACE_NODE);

    console.log(node.type, node.toString());
    /**
     * 'WhiteSpaceNode', '\n\n'
     */
});
```

Find the first following sibling that passes `test`, `child.next` if `test` is omitted, or `null`.

### Child#findAllBefore(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var whiteSpace = tree.head.head[3];

    whiteSpace.findBefore(tree.WORD_NODE).forEach(function (node) {
        console.log(node.type, node.toString());
    });
    /**
     * 'WordNode', 'simple'
     * 'WordNode', 'Some'
     */
});
```

> Important! Note the order in which siblings are returned!

Find preceding siblings that pass `test`.

### Child#findAllAfter(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var whiteSpace = tree.head.head[3];

    whiteSpace.findAfter().forEach(function (node) {
        console.log(node.type, node.toString());
    });
    /**
     * 'WordNode', 'text'
     * 'PunctuationNode', '.'
     */
});
```

Find following siblings that pass `test`.

### Child#findParent(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.head.head.findParent(tree.head)

    console.log(node.type, node.toString());
    /**
     * 'ParagraphNode', 'Some simple text.'
     */

    tree.head.head.head.findParent(tree.tail); // null
});
```

Find the first parent that passes `test`, `child.parent` if `test` is omitted, or `null`.

### Child#findParents(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    tree.head.head.head.findParents().forEach(function (node) {
        console.log(node.type, node.toString());
    });
    /**
     * 'SentenceNode', 'Some simple text.'
     * 'ParagraphNode', 'Some simple text.'
     * 'RootNode', 'Some simple text.\n\nAnother paragraph.'
     */
});
```

Find parents that pass `test`.

### Parent#findFirstChild(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.head.findFirstChild(tree.PUNCTUATION_NODE);

    console.log(node.type, node.toString());
    /**
     * 'PunctuationNode', '.'
     */
});
```

Find the first child that passes `test`, `parent.head` if `test` is omitted, or `null`.

### Parent#findLastChild(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    var node = tree.head.head.findLastChild(tree.WORD_NODE);

    console.log(node.type, node.toString());
    /**
     * 'WordNode', 'text'
     */
});
```

Find the last child that passes `test`, `parent.tail` if `test` is omitted, or `null`.

### Parent#findChildren(test?)

```js
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    tree.head.head.findChildren(tree.WORD_NODE).forEach(function (node) {
        console.log(node.type, node.toString());
    });
    /**
     * 'WordNode', 'Some'
     * 'WordNode', 'simple'
     * 'WordNode', 'text'
     */
});
```

Find children that pass `test`, or all children if `test` is omitted.

## License

MIT © Titus Wormer
