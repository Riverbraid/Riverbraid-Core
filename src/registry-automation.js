const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', '..', 'Riverbraid-Manifest-Gold', 'registry.json');

function evaluateModuleHealth(moduleName, result) {
    if (!result.passed) {
        const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
        registry.gold_modules[moduleName] = {
            ...registry.gold_modules[moduleName],
            status: 'dormant',
            reason: result.errors.join('; '),
            dormant_since: new Date().toISOString()
        };
        fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
        console.log(`[AUTONOMIC] Quarantined ${moduleName} due to integrity failure.`);
        return false;
    }
    return true;
}

module.exports = { evaluateModuleHealth };
