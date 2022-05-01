const operators = ["+","-","/","*","%","<",">","&&",">=","<=","==", "===","||","!=","!==","="];

const keywords = "let|for-each|list|defun|do|eldo|if|while".split("|");

const isOperator = v => operators.indexOf(v) >= 0;

const isKeyword = v => keywords.indexOf(v) >= 0;

const kebabToCamelCase = v => {
    const [a, ...rest] = v.split("-");
    return a + rest.map(x => x.substring(0,1).toUpperCase() + x.substring(1)).join("");
};

const parse = tokens => {
    return tokens.map(token => {
        if(Array.isArray(token)) {
            return parse(token);
        } else if(token === "null") {
            return {
                type: "null",
                return: null
            };
        } else if(!isNaN(token)) {
            return {
                type: "number",
                value: parseFloat(token)
            }
        } else if(token === "true" || token === "false") {
            return {
                type: "boolean",
                value: token === "true" ? true : false
            }
        } else if(isOperator(token)) {
            return {
                type: "operator",
                value: token
            }
        } else if(token[0] === "$") {
            return {
                type: "variable",
                value: kebabToCamelCase(token.substring(1))
            }
        } else if(isKeyword(token)) {
            return {
                type: "keyword",
                value: kebabToCamelCase(token)
            }
        } else if(token[0] === '"') {
            return {
                type: "string",
                value: token.substring(1, token.length - 1)
            }
        } else {
            return {
                type: "identifier",
                value: kebabToCamelCase(token)
            }
        }
    });
};

export default parse;
