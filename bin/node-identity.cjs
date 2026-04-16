const crypto = require('crypto');
const os = require('os');

function getNodeFingerprint() {
    const interfaces = os.networkInterfaces();
    const macs = Object.values(interfaces)
        .flat()
        .filter(details => !details.internal && details.mac !== '00:00:00:00:00:00')
        .map(details => details.mac);
    
    const rawId = macs.length > 0 ? macs.sort()[0] : os.hostname();
    return crypto.createHash('sha256').update(rawId).digest('hex').substring(0, 16);
}

const fingerprint = getNodeFingerprint();
process.stdout.write(fingerprint);
