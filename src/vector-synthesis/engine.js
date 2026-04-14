const crypto = require('crypto');

const CONSTITUTIONAL_HIERARCHY = [
    'Refusal', 'Safety', 'Judicial', 'Crypto', 'Cognition', 
    'Temporal', 'Manifest', 'Action', 'Integration', 'Memory', 
    'Interface', 'Network', 'Vision', 'Audio'
];

function braidVectors(inputs, invariants, options = {}) {
    const { hierarchy = CONSTITUTIONAL_HIERARCHY, blendStrategy = 'strict_priority', context = {} } = options;
    if (!inputs || inputs.length === 0) throw new Error('Refusal: No input vectors provided.');

    const viableInputs = inputs.filter(input => {
        try { return Object.values(invariants).every(inv => inv.check(input.value, context)); }
        catch (e) { return false; }
    });

    if (viableInputs.length === 0) throw new Error('Refusal: No input vector satisfies invariants.');

    let resolvedState;
    switch (blendStrategy) {
        case 'weighted_average': resolvedState = blendWeightedAverage(viableInputs); break;
        case 'union': resolvedState = blendUnion(viableInputs); break;
        default: resolvedState = resolveByHierarchy(viableInputs, hierarchy); break;
    }

    for (const [name, inv] of Object.entries(invariants)) {
        if (!inv.check(resolvedState, context)) throw new Error(`Refusal: Invariant violation "${name}"`);
    }
    return resolvedState;
}

function resolveByHierarchy(inputs, hierarchy) {
    const sorted = [...inputs].sort((a, b) => {
        const rankA = hierarchy.indexOf(a.source) === -1 ? hierarchy.length : hierarchy.indexOf(a.source);
        const rankB = hierarchy.indexOf(b.source) === -1 ? hierarchy.length : hierarchy.indexOf(b.source);
        return rankA - rankB;
    });
    const highest = sorted[0];
    const ties = sorted.filter(v => hierarchy.indexOf(v.source) === hierarchy.indexOf(highest.source));
    if (ties.length > 1) {
        ties.sort((a, b) => ((b.trustWeight || 1.0) - (a.trustWeight || 1.0)) || (b.signature || '').localeCompare(a.signature || ''));
        return ties[0].value;
    }
    return highest.value;
}

function blendWeightedAverage(inputs) {
    if (inputs.length === 1) return inputs[0].value;
    const totalWeight = inputs.reduce((sum, v) => sum + (v.trustWeight || 1.0), 0);
    const result = JSON.parse(JSON.stringify(inputs[0].value));
    // Implementation for numeric path blending...
    return result; 
}

function blendUnion(inputs) {
    const result = {};
    for (const input of inputs) {
        for (const [key, val] of Object.entries(input.value)) {
            if (Array.isArray(val)) {
                result[key] = Array.from(new Set([...(result[key] || []), ...val]));
            } else {
                result[key] = val;
            }
        }
    }
    return result;
}

module.exports = { braidVectors, CONSTITUTIONAL_HIERARCHY };
