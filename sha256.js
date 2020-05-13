let crypto
try {
    crypto = require('crypto')
} catch(err) {
    console.log('Crypto not available on your platform, cannot make blocks')
}


module.exports = function sha256(input) {
    return crypto.createHash('sha256').update(input).digest('Hex')
}