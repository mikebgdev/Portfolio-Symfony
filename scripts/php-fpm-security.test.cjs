const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { securePool } = require('./configure-php-fpm-security.cjs');
const base = '[global]\ndaemonize=no\n[www]\nlisten=127.0.0.1:9000\nuser=nobody\n';
test('locks the real web pool setting while preserving listener and process configuration', () => {
    const result = securePool(base);
    assert.ok(result.includes('listen=127.0.0.1:9000\nuser=nobody\n'));
    assert.ok(result.includes('php_admin_flag[session.upload_progress.enabled] = off'));
    assert.equal(securePool(result), result);
});
test('replaces all conflicting user/admin flag and value forms in the pool', () => {
    const result = securePool(base + 'php_flag[session.upload_progress.enabled] = on\nphp_admin_value[session.upload_progress.enabled] = 1\n');
    assert.equal((result.match(/\[session\.upload_progress\.enabled\]/g) || []).length, 1);
    assert.ok(result.endsWith('php_admin_flag[session.upload_progress.enabled] = off\n'));
});
test('keeps CRLF, comments and unrelated session settings', () => {
    const result = securePool((base + '; normal comment\nphp_value[session.serialize_handler] = php\n').replaceAll('\n', '\r\n'));
    assert.ok(result.includes('php_value[session.serialize_handler] = php\r\n'));
    assert.equal(result.replaceAll('\r\n', '').includes('\n'), false);
    assert.equal(securePool(result), result);
});
test('rejects missing, duplicate or additional pools instead of silently leaving a web pool unsafe', () => {
    for (const source of ['[global]\n', base + '[extra]\nlisten=9001\n', base + '[www]\nlisten=9002\n']) assert.throws(() => securePool(source));
});
test('both Nixpacks install hook and Docker artifact persist the setting', () => {
    assert.ok(fs.readFileSync('scripts/install-production.sh','utf8').includes('node scripts/configure-php-fpm-security.cjs'));
    assert.ok(fs.readFileSync('Dockerfile','utf8').includes('COPY config/php/security.ini /usr/local/etc/php/conf.d/zz-security.ini'));
    assert.match(fs.readFileSync('config/php/security.ini','utf8'), /^session\.upload_progress\.enabled\s*=\s*0$/m);
});
