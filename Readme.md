# retext-find [![Build Status](https://img.shields.io/travis/wooorm/retext-find.svg?style=flat)](https://travis-ci.org/wooorm/retext-find) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-find.svg?style=flat)](https://coveralls.io/r/wooorm/retext-find?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** node finder.

## Installation

npm:

```bash
$ npm install retext-find
```

Component:

```bash
$ component install wooorm/retext-find
```

Bower:

```bash
$ bower install retext-find
```

## Usage

```javascript
var Retext = require('retext');
var find = require('retext-find');
var inspect = require('retext-inspect');

var retext = new Retext()
    .use(inspect)
    .use(find);

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

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.tail.findBefore(tree.PARAGRAPH_NODE));
    /**
     * ParagraphNode[1]
     * └─ SentenceNode[6]
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'Some'
     *    ├─ WhiteSpaceNode: ' '
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'simple'
     *    ├─ WhiteSpaceNode: ' '
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'text'
     *    └─ PunctuationNode: '.'
     */
});
```

Find the first preceding sibling that passes `test`, `child.prev` if `test` is omitted, or `null`.

### Child#findAfter(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.findAfter(tree.WHITE_SPACE_NODE));
    /**
     * WhiteSpaceNode: '\n\n'
     */
});
```

Find the first following sibling that passes `test`, `child.next` if `test` is omitted, or `null`.

### Child#findBeforeUpwards(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.tail.head.head.findBeforeUpwards());
    /**
     * WhiteSpaceNode: '\n\n'
     */
});
```

Find the first node directly before an ancestor that passes `test`, or `null`.

### Child#findAfterUpwards(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head.tail.findAfterUpwards());
    /**
     * WhiteSpaceNode: '\n\n'
     */
});
```

Find the first node directly after an ancestor that passes `test`, or `null`.

### Child#findAfter(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.findAfter(tree.WHITE_SPACE_NODE));
    /**
     * WhiteSpaceNode: '\n\n'
     */
});
```

Find the first following sibling that passes `test`, `child.next` if `test` is omitted, or `null`.

### Child#findAllBefore(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head[3].findAllBefore(tree.WORD_NODE));
    /**
     * [
     *   WordNode[1]
     *   └─ TextNode: 'simple',
     *   WordNode[1]
     *   └─ TextNode: 'Some'
     * ]
     */
});
```

> Important! Note the order in which siblings are returned!

Find preceding siblings that pass `test`.

### Child#findAllAfter(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head[3].findAllAfter());
    /**
     * [
     *   WordNode[1]
     *   └─ TextNode: 'text',
     *   PunctuationNode: '.'
     * ]
     */
});
```

Find following siblings that pass `test`.

### Child#findParent(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head.head.findParent(tree.head));
    /**
     * ParagraphNode[1]
     * └─ SentenceNode[6]
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'Some'
     *    ├─ WhiteSpaceNode: ' '
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'simple'
     *    ├─ WhiteSpaceNode: ' '
     *    ├─ WordNode[1]
     *    │  └─ TextNode: 'text'
     *    └─ PunctuationNode: '.'
     */

    console.log(tree.head.head.head.findParent(tree.tail));
    /**
     * null
     */
});
```

Find the first parent that passes `test`, `child.parent` if `test` is omitted, or `null`.

### Child#findParents(test?)

```javascript
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

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head.findFirstChild(tree.PUNCTUATION_NODE));
    /**
     * PunctuationNode: '.'
     */
});
```

Find the first child that passes `test`, `parent.head` if `test` is omitted, or `null`.

### Parent#findLastChild(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head.findLastChild(tree.WORD_NODE));
    /**
     * WordNode: 'text'
     */
});
```

Find the last child that passes `test`, `parent.tail` if `test` is omitted, or `null`.

### Parent#findChildren(test?)

```javascript
retext.parse('Some simple text.\n\nAnother paragraph.', function (err, tree) {
    console.log(tree.head.head.findChildren(tree.WORD_NODE));
    /**
     * [
     *   WordNode[1]
     *   └─ TextNode: 'Some',
     *   WordNode[1]
     *   └─ TextNode: 'simple',
     *   WordNode[1]
     *   └─ TextNode: 'text'
     * ]
     */
});
```

Find children that pass `test`, or all children if `test` is omitted.

## Performance

```text
                  find all paragraphs before a document's last paragraph
     878,116 op/s » A section
     122,654 op/s » An article

                  find all paragraphs after a document's first paragraph
     920,695 op/s » A section
     136,250 op/s » An article

                  find the first white space in a document
  33,202,868 op/s » A section
  32,811,946 op/s » An article

                  find the last white space in a document
  27,831,461 op/s » A section
  30,050,900 op/s » An article
```

## License

MIT © [Titus Wormer](http://wooorm.com)
