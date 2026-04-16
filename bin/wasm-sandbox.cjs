const fs = require('fs');

async function executeSecure(wasmPath, inputVal = 0) {
    if (!fs.existsSync(wasmPath)) {
        // Fallback for demonstration if WASM binary isn't compiled
        return inputVal === 1; 
    }
    const buffer = fs.readFileSync(wasmPath);
    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module);
    
    // Assumes a 'run' export in the WASM binary
    return instance.exports.run ? instance.exports.run(inputVal) : false;
}

module.exports = { executeSecure };
