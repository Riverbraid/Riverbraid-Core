const fs = require('fs');
const path = require('path');
function enforceActiveModule(moduleName) {
    const registryPath = path.join(__dirname, '..', '..', 'Riverbraid-Manifest-Gold', 'registry.json');
    if (!fs.existsSync(registryPath)) return true;
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const moduleEntry = registry.gold_modules[moduleName];
    if (!moduleEntry) throw new Error(`FATAL: Unknown Gold module "${moduleName}"`);
    if (moduleEntry.status === 'dormant') throw new Error(`INTEGRITY_VIOLATION: "${moduleName}" is dormant.`);
    return true;
}
module.exports = { enforceActiveModule };
