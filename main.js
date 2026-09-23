const acode = window.acode;

acode.setPluginInit("and-syntax", (baseUrl, $page, options) => {

    const editorLanguages = acode.require("editorLanguages");

    editorLanguages.register(
        "and",
        ["and"],
        "aNd",
        async () => {

            const language = acode.require("@codemirror/language");
            const { StreamLanguage } = language;

            return StreamLanguage.define({
                token(stream) {

                    if (stream.match(/^~~.*/)) return "comment";

                    if (stream.match(/^'[^']*'/)) return "string";

                    if (stream.match(/^\/(run|finish)\b/)) {
                        return "keyword";
                    }

                    if (stream.match(/^if\b/)) {
                        return "keyword";
                    }

                    if (stream.match(/^else=/)) {
                        return "keyword";
                    }

                    if (stream.match(/^(true|nil|false)\b/)) {
                        return "bool";
                    }

                    if (stream.match(/^print(?=\()/)) {
                        return "function";
                    }

                    if (stream.match(/^(L|func);/)) {
                        return "keyword";
                    }

                    if (stream.match(/^(Assets|Hireracy)\b/)) {
                        return "variableName";
                    }

                    if (stream.match(/^[A-Za-z_][A-Za-z0-9_]*;/)) {
                        return "definition";
                    }

                    stream.next();
                    return null;
                }
            });
        }
    );

    console.log("aNd Syntax loaded!");
});