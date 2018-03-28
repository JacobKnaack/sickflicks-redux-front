export const renderIf = (test, component) => test ? component : null

export const renderEither = (test, component1, component2) => test ? component1 : component2