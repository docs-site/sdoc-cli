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
const readline = require('readline');
const fs = require('fs');

/** @brief 创建commander的Command实例 */
const program = new commander.Command();

/** 
 * @brief 创建readline接口用于用户交互
 * @type {readline.Interface}
 */
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * @brief 创建markdown文件
 * @param {string} fileName 要创建的文件名（不带扩展名）
 * @return {Promise<void>} 无返回值
 */
async function createMarkdownFile(fileName) {
	const filePath = `${fileName}.md`;
	const content = `# ${fileName}\n\n`;

	// 检查文件是否已存在
	if (fs.existsSync(filePath)) {
		const answer = await new Promise(resolve => {
			rl.question(`File ${filePath} already exists. Overwrite? (y/n) `, resolve);
		});

		// 用户取消操作
		if (answer.toLowerCase() !== 'y') {
			console.log('Operation cancelled');
			rl.close();
			return;
		}
	}

	// 创建/覆盖文件
	fs.writeFileSync(filePath, content, 'utf8');
	console.log(`Created ${filePath}`);
	rl.close();
}

/** 
 * @brief 添加"n"子命令及其参数和动作 
 */
program
	.command("n")
	.argument('[fileName]', 'file name', 'demo')
	.description('create markdown file!')
	.action(createMarkdownFile);

program.parse(); // 参数处理

// Try the following:
//    node index.js n
//    node index.js n fileName
