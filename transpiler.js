import parse from "./parser.js";
import tokenize from "./tokenizer.js";

const TAB_LENGTH = 2;

const blockify = (n, v) => `${" ".repeat(TAB_LENGTH).repeat(n)}${v}`;

const transpileLet = (block, identifier, ...values) => {
    const value = transpile(0, values);
    return blockify(block, `let ${identifier.value} = ${!value.length ? null : value}\n`);
};

const transpilePrint = (block, values) => {
    return blockify(block, `console.log(${transpile(block, values).join(",")})`);
};

const transpilePrintError = (block, values) => {
    return blockify(block, `console.error(${transpile(block, values).join(",")})`);
};

const transpileBinaryOp = (block, op, values) => {
    if(op === "=") {
        return transpileSetStmt(block, ...values);
    } else if(op === "+=" || op === "-=" || op === "/=" || op === "*=") {
        return blockify(block, transpile(0, values).join(` ${op} `));
    }
    return transpile(0, values).join(` ${op} `);
};

const transpileList = (values) => {
    return `[${transpile(0, values).join(",")}]`;
};

const transpileFn = (block, identifier, parameters, ...rest) => {
    let fnName = "";
    if(Array.isArray(identifier)) {
        rest = [[...parameters, ...rest]];
        parameters = identifier;
    } else {
        fnName = identifier.value;
    }
    return blockify(
        fnName ? block : 0, 
        `function${fnName ? ` ${fnName} ` : ''}(${transpile(0, parameters).join(",")}) {\n${transpileDoBlock(block, rest)}\n${blockify(block, "}")}\n`
    );
};

const transpileDoBlock = (block, rest) => {
    return transpile(block + 1, rest).join("\n");
};

const transpileEachOf = (block, list, [key, val], doBlock) => {
    return blockify(block, `${(Array.isArray(list) ? transpileList(list.slice(1)) : list.value)}.forEach((${val.value}, ${key.value}) => {\n${transpile(block, [doBlock]).join(";\n")}\n${blockify(block, "})")}`);
};

const transpileCondition = condition => {
    return transpile(0, [condition]).join("");
};

const transpileElseStmt = (block, elseBlock) => {
    return ` else {\n${transpileDoBlock(block, elseBlock)}\n${blockify(block, "}")}`;
};

const transpileIfStmt = (block, condition, doBlock, elseBlock) => {
    return blockify(block, `if(${transpileCondition(condition)}) {\n${transpile(block, [doBlock]).join(";\n")}\n${blockify(block, "}")}${Array.isArray(elseBlock) ? transpileElseStmt(block, elseBlock) : ''}`);
};

const transpileSetStmt = (block, identifier, ...values) => {
    const value = transpile(block, values).join("");
    return blockify(block, `${identifier.value} = ${!value ? null : value}`);
};

const transpileWhileLoop = (block, condition, doBlock) => {
    return blockify(block, `while(${transpileCondition(condition)}) {\n${transpile(block, [doBlock]).join(";\n")}\n${blockify(block, "}")}`);
};

const transpileReturnStmt = (block, rest) => {
    return blockify(block, `return ${transpile(0, rest).join(",")}`);
};

const transpileInitStmt = (block, clsName, args) => {
    return blockify(block, `new ${clsName.value}(${transpile(0, args).join(",")})`);
};

const transpile = (block, ast) => {
    return ast.map(curr => {
        if(Array.isArray(curr)) {
            if(Array.isArray(curr[0])) {
                return `(${transpile(block, curr).join("")})`;
            } else {
                const [op, ...rest] = curr;
                switch(op.type) {
                    case "keyword":
                        switch(op.value) {
                            case "let":
                                return transpileLet(block, ...rest);
                            case "array":
                                return transpileList(rest);
                            case "defun":
                                return transpileFn(block, ...rest);
                            case "loop":
                                return transpileEachOf(block, ...rest);
                            case "while":
                                return transpileWhileLoop(block, ...rest);
                            case "do":
                                return transpileDoBlock(block, rest);
                            case "if":
                                return transpileIfStmt(block, ...rest);
                            case "return":
                                return transpileReturnStmt(block, rest);
                            case "new":
                                return transpileInitStmt(block, ...rest);
                        }
                    break;
                    case "identifier":
                        switch(op.value) {
                            case "print":
                                return transpilePrint(block, rest);
                            case "error":
                                return transpilePrintError(block, rest);
                            default:
                                return `${op.value}(${transpile(block, rest).join(",")})`
                        }
                    case "operator":
                        return transpileBinaryOp(block, op.value, rest);
                }
            }
        }

        return curr.value;
    
    });
};

const lispLike = code => {
    const ast = parse(tokenize(code));
    return transpile(0, ast).join("\n");
};

export default lispLike;
