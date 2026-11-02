'use strict';
const fs = require('node:fs');

function securePool(source) {
    const newline = source.includes('\r\n') ? '\r\n' : '\n';
    const sections = [...source.matchAll(/^\s*\[([^\]\r\n]+)\]\s*(?:;[^\r\n]*)?$/gm)].map(match => match[1].trim());
    if (sections.filter(name => name === 'www').length !== 1 || sections.some(name => !['global', 'www'].includes(name))) {
        throw new Error('Expected the Nixpacks global/www pool layout; refusing an unreviewed FPM configuration');
    }
    const output = [];
    let inPool = false;
    let inserted = false;
    const insertFlag = () => {
        if (inPool && !inserted) {
            output.push('php_admin_flag[session.upload_progress.enabled] = off');
            inserted = true;
        }
    };
    for (const line of source.replace(/\r?\n$/, '').split(/\r?\n/)) {
        const section = line.match(/^\s*\[([^\]]+)\]\s*(?:;.*)?$/);
        if (section) {
            insertFlag();
            inPool = section[1].trim() === 'www';
        }
        if (inPool && /^\s*php_(?:admin_)?(?:flag|value)\[session\.upload_progress\.enabled\]\s*=/i.test(line)) continue;
        output.push(line);
    }
    insertFlag();
    return output.join(newline) + newline;
}

if (require.main === module) {
    const file = process.argv[2] || '/assets/php-fpm.conf';
    const original = fs.readFileSync(file, 'utf8');
    const secured = securePool(original);
    if (original !== secured) fs.writeFileSync(file, secured);
    console.log('PHP-FPM session upload progress disabled in the web pool');
}
module.exports = { securePool };
