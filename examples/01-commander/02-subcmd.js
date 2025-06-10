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
	.command('n')
	.description('print hello world!')
	.action(() => {
		console.log(`✅ Hello, World!`);
	});

program.parse();
