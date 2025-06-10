#!/usr/bin/env node
/** =====================================================
 * Copyright © hk. 2022-2025. All rights reserved.
 * File name  : 
 * Author     : 苏木
 * Date       : 2025-06-10
 * Version    : 
 * Description: https://commander.nodejs.cn/
 *              https://github.com/tj/commander.js
 * ======================================================
 */
const commander = require('commander');
const program = new commander.Command(); // 创建本地 Command 对象

program
	.option('-d, --debug', 'output extra debugging')
	.option('-s, --small', 'small pizza size')
	.option('-p, --pizza-type <type>', 'flavour of pizza', "typea");

program.parse(process.argv);

const options = program.opts();
if (options.debug) {
	console.log(options);
}

console.log('pizza details:');
if (options.small) {
	console.log('- small pizza size');
}
if (options.pizzaType) {
	console.log(`- ${options.pizzaType}`);
}

// Try the following:
//    node 01-options.js -p
//    node 01-options.js -d -s -p vegetarian
//    node 01-options.js --pizza-type=cheese
