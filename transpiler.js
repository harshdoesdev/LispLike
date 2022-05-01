const transpileLet = (identifier, ...values) => {
    return `let ${identifier.value} = ${transpile(values)}`;
};

const transpilePrint = values => {
    return `console.log(${transpile(values).join(",")})`;
};

const transpileMath = (op, values) => {
    return transpile(values).join(op);
};

const transpileList = values => {
    return `[${transpile(values).join(",")}]`;
};

const transpileFn = (identifier, parameters, ...rest) => {
    return `let ${identifier.value} = (${transpile(parameters).join(",")}) => ${transpile(rest).join("")}`;
};

const transpileDoBlock = rest => {
    return transpile(rest).join("");
};

const transpileEachOf = (list, x, ...doBlock) => {
    return `${(Array.isArray(list) ? transpileList(list.slice(1)) : list.value)}.forEach(${x.value} => {\n${transpile(doBlock).join(";\n")}\n})`;
};

const transpile = ast => {
    return ast.map(curr => {
        if(Array.isArray(curr)) {
            if(Array.isArray(curr[0])) {
                return `(${transpile(curr).join("")})`;
            } else {
                const [op, ...rest] = curr;
                switch(op.type) {
                    case "keyword":
                        switch(op.value) {
                            case "let":
                                return transpileLet(...rest);
                            case "list":
                                return transpileList(rest);
                            case "defun":
                                return transpileFn(...rest);
                            case "forEach":
                                return transpileEachOf(...rest);
                            case "do":
                                return transpileDoBlock(rest);
                        }
                    break;
                    case "identifier":
                        switch(op.value) {
                            case "print":
                                return transpilePrint(rest);
                            default:
                                return `${op.value}(${transpile(rest).join(",")})`
                        }
                    case "operator":
                        return transpileMath(op.value, rest);
                }
            }
        }

        switch(curr.type) {
            case "variable":
                return curr.value;
            case "string":
                return `"${curr.value}"`;
            default:
                return curr.value;
        }
    });
};

const lisp = code => {
    const ast = parse(tokenize(code));
    return transpile(ast).join("\n");
};
