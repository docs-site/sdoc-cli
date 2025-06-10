#!/usr/bin/env node
/** =====================================================
 * Copyright © hk. 2022-2025. All rights reserved.
 * File name  : 
 * Author     : 苏木
 * Date       : 2025-06-10
 * Version    : 
 * Description: 
 * ======================================================
 */
const commander = require('commander');

/** @brief 创建commander的Command实例 */
const program = new commander.Command();

/** 
 * @brief 添加"n"子命令及其参数和动作 
 */
program
	.command("n")
	.description('print hello world!')
	.action(() => {
		console.log(`✅ Hello, World!`);
	});

program.parse(); // 参数处理

// Try the following:
//    node index.js n
