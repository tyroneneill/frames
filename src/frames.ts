/**
 * Find the root window, the root window being that of the highest association.
 * Given the example of an iframe within an iframe inside a popup window owned
 * by some application, the application itself will be the root:
 *
 * [Iframe] -> [IFrame] -> [Window] -> [Owner Window]
 *
 * The implementation uses both the "opener" and "parent" properties to navigate
 * to a root, since these are both accessible cross domain by default there is no need to
 * check for accessibility.
 */
export function getRootWindow(fromContext: Window = window,
                              accessible: boolean = false): Window {
    let current: Window = fromContext;
    while (current && current.opener || current !== current.parent) {
        const target = current.opener || current.parent;
        // Short-circuit if inaccessible window and flagged for cross-vm checking.
        if (accessible && testWindowAccessible(target) === false) {
            return current;
        }
        current = target;
    }
    return current;
}

export function getWindowFromElement(element: HTMLElement): Window {
    const doc: Document = element.ownerDocument;
    return doc.defaultView || (<any>doc).parentWindow;
}

export function isFrame(window: Window): boolean {
    return window.frameElement !== null;
}

export function testWindowAccessible(window: Window): boolean {
    try {
        window.document;
        return true;
    } catch (err) {
        return false;
    }
}
