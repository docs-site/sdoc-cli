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
const path = require('path');
const getTime = require('./utils/sys_time');

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
 * @brief 读取模板文件内容
 * @param {string} templatePath 模板文件路径
 * @return {string} 模板文件内容
 * @throws {Error} 当文件读取失败时抛出异常
 */
function readTemplate(templatePath) {
	try {
		return fs.readFileSync(templatePath, 'utf8');
	} catch (err) {
		console.error(`❌ 模板文件读取失败: ${templatePath}`);
		console.error(err.message);
		process.exit(1);
	}

}

/**
 * @brief 替换模板中的占位符生成最终内容
 * @param {string} template 模板内容
 * @param {string} name 要替换的标题名称
 * @return {string} 替换后的内容
 */
function generateContent(template, name) {
	return template
		.replace(/{{ title }}/g, name)
		.replace(/{{ date }}/g, getTime.getCurrentDateTime());
}

/**
 * @brief 创建markdown文件
 * @param {string} fileName 要创建的文件名（不带扩展名）
 * @return {Promise<void>} 无返回值
 */
async function createMarkdownFile(fileName) {
	const filePath = `${fileName}.md`;

	// 1. 确定模板路径
	const templatePath = path.join(__dirname, 'scaffolds', 'post.md');
	// 2. 读取模板内容
	const template = readTemplate(templatePath);

	// 3. 生成文件内容
	const content = generateContent(template, fileName);

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

	console.log(`✅ 文档已生成: ${filePath}`);
	console.log(`📋 使用模板: ${path.relative(process.cwd(), templatePath)}`);
	console.log(`⏰ 创建时间: ${getTime.getCurrentDateTime()}`);
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
