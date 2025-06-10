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

/** @brief 创建commander的Command实例 */
const program = new commander.Command();

/** 
 * @brief 添加"add"子命令及其参数和动作 
 */
program
	.argument('<name>')
	.option('-t, --title <honorific>', 'title to use before name')
	.option('-d, --debug', 'display some debugging')
	.action((name, options, command) => {
		if (options.debug) {
			console.error('Called %s with options %o', command.name(), options);
		}
		const title = options.title ? `${options.title} ` : '';
		console.log(`Thank-you ${title}${name}`);
	});

program.parse(); // 参数处理

// Try the following:
//    node 04-subcmd-action.js John
//    node 04-subcmd-action.js Doe --title Mr
//    node 04-subcmd-action.js --debug Doe --title Mr
