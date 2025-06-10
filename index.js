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
 * @brief 确认是否覆盖已存在的文件
 * @param {string} filePath 要检查的文件路径
 * @return {Promise<boolean>} 用户确认结果 (true表示确认覆盖)
 */
async function confirmOverwrite(filePath) {
	return new Promise((resolve) => {
		rl.question(`⚠️  文件已存在: ${filePath} 是否覆盖? (y/N) `, (answer) => {
			resolve(answer.trim().toLowerCase() === 'y');
		});
	});
}

/**
 * @brief 创建markdown文件
 * @param {string} fileName 要创建的文件名（不带扩展名）
 * @param {Object} options 命令行选项
 * @param {string} [options.template=post] 模板名称
 * @param {boolean} [options.force=false] 是否强制覆盖
 * @return {Promise<void>} 无返回值
 * @throws {Error} 当文件创建失败时抛出异常
 */
async function createMarkdownFile(fileName, options) {
	// 1. 确定模板路径
	const templatePath = path.join(__dirname, 'scaffolds', `${options.template}.md`);
	try {
		const template = readTemplate(templatePath); 		 // 2. 读取模板内容
		const content = generateContent(template, fileName); // 3. 生成文件内容
		// 4. 确定输出目录和路径
		const outputDir = options.dir ? path.join(process.cwd(), options.dir) : path.join(process.cwd(), 'test');
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
			console.log(`📁 创建目录: ${outputDir}`);
		}
		const outputPath = path.join(outputDir, `${fileName}.md`);
		try {
			const fileExists = fs.existsSync(outputPath); // 5. 检查文件是否存在
			// 6. 处理文件存在的情况
			if (fileExists) {
				if (options.force) {
					console.log(`🔧 强制覆盖已存在的文件: ${outputPath}`);
				} else {
					const overwrite = await confirmOverwrite(outputPath);
					if (!overwrite) {
						console.log('🚫 操作已取消');
						return;
					}
				}
			}
			// 7. 创建/覆盖文件
			fs.writeFileSync(outputPath, content, 'utf8');
			console.log(`✅ 文档已生成: ${outputPath}`);
			console.log(`📋 使用模板: ${path.relative(process.cwd(), templatePath)}`);
			console.log(`⏰ 当前时间: ${getTime.getCurrentDateTime()}`);
		} catch (err) {
			throw new Error(`文件创建失败: ${outputPath}\n${err.message}`);
		}
	} catch (err) {
		console.error(`❌ ${err.message}`);
		process.exit(1);
	} finally {
		rl.close();
	}
}

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
	.action(createMarkdownFile);

program.parse(); // 参数处理

// Try the following:
//    node index.js n
//    node index.js n fileName
