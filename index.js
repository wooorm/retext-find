'use strict';

/**
 * Detect if `node` passes a test.
 *
 * @param {Node} node
 * @param {Node|string?} test - If `string`, node's type,
 *   if `Node`, equal to `node`. Otherwise always passes.
 * @return {boolean}
 */
function assert(node, test) {
    if (typeof test === 'string') {
        return node.type === test;
    }

    if (test && 'TextOM' in test) {
        return node === test;
    }

    return true;
}

/**
 * Find a node from `node` in `direction`, which passes
 * `test`.
 *
 * @param {Node} node
 * @param {string} direction - Such as `prev`, `parent`.
 * @param {Node|string?} test - See `assert`.
 * @return {Node?} Found node or `null`.
 */
function findInDirection(node, direction, test) {
    node = node[direction];

    while (node) {
        if (assert(node, test)) {
            return node;
        }

        node = node[direction];
    }

    return null;
}

/**
 * Find a following node upwards.
 *
 * @param {Node} node
 * @param {string} direction - Such as `prev` or `next`.
 * @param {Node|string?} test - See `assert`.
 * @return {Node?} Found node or `null`.
 */
function findUpwardsInDirection(node, direction, test) {
    node = node.parent;

    while (node) {
        if (node[direction]) {
            if (assert(node[direction], test)) {
                return node[direction];
            }
        }

        node = node.parent;
    }

    return null;
}

/**
 * Find all nodes from `node` in `direction` that pass
 * `test`.
 *
 * @param {Node} node
 * @param {string} direction - Such as `prev`, `parent`.
 * @param {Node|string?} test - See `assert`.
 * @return {Array.<Node>} Found nodes.
 */
function findAllInDirection(node, direction, test) {
    var result;

    result = [];

    node = findInDirection(node, direction, test);

    while (node) {
        result.push(node);

        node = findInDirection(node, direction, test);
    }

    return result;
}

/**
 * Find the first preceding sibling that passes `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findBefore(test) {
    return findInDirection(this, 'prev', test);
}

/**
 * Find the first following sibling that passes `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findAfter(test) {
    return findInDirection(this, 'next', test);
}

/**
 * Find the first preceding node upwards that passes `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findBeforeUpwards(test) {
    return findUpwardsInDirection(this, 'prev', test);
}

/**
 * Find the first following node upwards that passes `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findAfterUpwards(test) {
    return findUpwardsInDirection(this, 'next', test);
}

/**
 * Find preceding siblings that pass `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Array.<Child>} Found nodes.
 */
function findAllBefore(test) {
    return findAllInDirection(this, 'prev', test);
}

/**
 * Find following siblings that pass `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Array.<Child>} Found nodes.
 */
function findAllAfter(test) {
    return findAllInDirection(this, 'next', test);
}

/**
 * Find the first parent that passes `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Parent?} Found parent, or null.
 */
function findParent(test) {
    return findInDirection(this, 'parent', test);
}

/**
 * Find all parents that pass `test`.
 *
 * @this {Child}
 * @param {Node|string?} test - See `assert`.
 * @return {Array.<Parent>} Found nodes.
 */
function findParents(test) {
    return findAllInDirection(this, 'parent', test);
}

/**
 * Find the first child that passes `test`.
 *
 * @this {Parent}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findFirstChild(test) {
    if (assert(this.head, test)) {
        return this.head;
    }

    return findInDirection(this.head, 'next', test);
}

/**
 * Find the last child that passes `test`.
 *
 * @this {Parent}
 * @param {Node|string?} test - See `assert`.
 * @return {Child?} Found node.
 */
function findLastChild(test) {
    if (assert(this.tail, test)) {
        return this.tail;
    }

    return findInDirection(this.tail, 'prev', test);
}

/**
 * Find all children that pass `test`.
 *
 * @this {Parent}
 * @param {Node|string?} test - See `assert`.
 * @return {Array.<Child>} Found nodes.
 */
function findChildren(test) {
    var result;

    result = [];

    if (assert(this.head, test)) {
        result = [this.head];
    }

    result = result.concat(findAllInDirection(this.head, 'next', test));

    return result;
}

/**
 * Define `find`.
 *
 * @param {Retext} retext
 */
function find(retext) {
    var TextOM,
        parentPrototype,
        elementPrototype,
        childPrototype;

    TextOM = retext.TextOM;
    childPrototype = TextOM.Child.prototype;
    elementPrototype = TextOM.Element.prototype;
    parentPrototype = TextOM.Parent.prototype;

    childPrototype.findBefore = findBefore;
    childPrototype.findAfter = findAfter;
    childPrototype.findBeforeUpwards = findBeforeUpwards;
    childPrototype.findAfterUpwards = findAfterUpwards;
    childPrototype.findAllBefore = findAllBefore;
    childPrototype.findAllAfter = findAllAfter;
    childPrototype.findParent = findParent;
    childPrototype.findParents = findParents;

    elementPrototype.findChildren = findChildren;
    parentPrototype.findChildren = findChildren;
    elementPrototype.findFirstChild = findFirstChild;
    parentPrototype.findFirstChild = findFirstChild;
    elementPrototype.findLastChild = findLastChild;
    parentPrototype.findLastChild = findLastChild;
}

/*
 * Expose `find`.
 */

exports = module.exports = find;
