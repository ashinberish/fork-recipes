export default {
    contextSeparator: '_',
    createOldCatalogs: true,
    defaultNamespace: 'translation',
    defaultValue: '',
    indentation: 2,
    keepRemoved: false,
    keySeparator: false,
    lexers: {
        js: ['JsxLexer'],
        jsx: ['JsxLexer'],
        ts: ['JsxLexer'],
        tsx: ['JsxLexer'],
        default: ['JsxLexer']
    },
    lineEnding: 'auto',
    locales: ['en','fr'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    failOnWarnings: true,
    pluralSeparator: '_',
}