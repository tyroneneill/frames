

export function getTopWindow(fromContext: Window = window): Window {
  let current: Window = fromContext;
  while (current && current !== current.parent) {
    try {
      // Testing for cross-domain access
      current.parent.document;
      current = current.parent;
    } catch (error) {
      // Likely hit a security issue, this is as far up the hierarchy we could get.
      return current;
    }
  }
  return current;
}
