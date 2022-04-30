const tokenize = v => {

    const tokens = v.trim().split("");

    let i = 0,
        len = tokens.length, 
        open = 0, // number of open braces
        output = null, // output
        block = null,  // current block
        sopen = false, // boolean to check if an string is open
        str = "", // temporary variable to hold characters of an string
        op = "", // temporary variable to hold characters of an op/function
        copen = false; // boolean to skip comments when detected

    const stack = [];

    while(i < len) {

        const curr = tokens[i];

        if(curr === ';' && !sopen) {
            copen = true;
        } else if(copen && curr === '\n') {
            copen = false;
        } else if(!copen) {
            if(curr === '"') {
                if(sopen) {
                    block.push(str);
                    str = '';
                    sopen = false;
                } else {
                    sopen = true;
                }
            } else if(curr === "(" && !sopen) {
                if(block) {
                    stack.push(block);
                }
                block = [];
                open++;
            } else if(curr === ")" && !sopen) {
                open--;
                if(op.length) {
                    block.push(op);
                    op = "";
                }
                
                if(!open) {
                    output = block;
                } else {
                    const parent = stack.pop();
                    parent.push(block);
                    block = parent;
                }
            } else if(/\s+/.test(curr) && !sopen) {
                if(curr === " ") {
                    if(op.length) {
                        block.push(op);
                        op = "";
                    }
                }
            } else {
                if(sopen) {
                    str += curr;
                } else {
                    op += curr;
                }
            }
        }

        i++;

    }

    return output;

};

export default tokenize;
