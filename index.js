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
const createMdFile = require('./command/cmd_create_md');

/** 
 * @brief 创建commander的Command实例 
 */
const program = new commander.Command();

/** 
 * @brief 添加"n"子命令及其参数和动作 
 */
program
	.command("n")
	.argument('[fileName]', 'file name', 'demo')
	.option('-t, --template <name>', '指定模板名称 (默认为post)', 'post')
	.option('-f, --force', '强制覆盖已存在的文件')
	.option('-d, --dir <dir>', '指定生成到哪个目录')
	.description('create markdown file!')
	.action(createMdFile.createMarkdownFile);

program.parse(); // 参数处理

// Try the following:
//    node index.js n
//    node index.js n fileName
