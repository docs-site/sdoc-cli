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
const pkg = require('./package.json');
const createMdFile = require('./command/cmd_create_md');
const processMdFileImg = require('./command/cmd_img');
const { main: treeMain } = require('./command/cmd_tree');
const gitSubmodule = require('./command/cmd_git_submodule');

/** 
 * @brief 创建commander的Command实例 
 */
const program = new commander.Command();

/**
 * @brief 获取版本和依赖信息
 * @returns {string} 格式化的版本和依赖信息
 */
function getVersionInfo() {
	return `${pkg.name}: ${pkg.version}` +
		`\n\nDependencies:` +
		`\n${Object.entries(pkg.dependencies || {})
			.map(([name, version]) => `  ${name}: ${version}`)
			.join('\n') || '  No dependencies found'}`;
}

/** 
 * @brief 设置程序的名称、版本和描述 
 */
program.version(
	getVersionInfo(),
	'-v, --version',
	'显示版本信息'
);


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

program
	.command("img")
	.argument('<file>', 'markdown文件路径')
	.description('处理markdown文件中的图片路径')
	.action(processMdFileImg.processImagePaths);

program
	.command("tree")
	.description('打印当前目录的树状结构')
	.option('-L, --depth <n>', '设置显示的目录深度')
	.action(treeMain);

program
	.command(gitSubmodule.command)
	.description(gitSubmodule.description)
	.action(gitSubmodule.handler);

program.parse(); // 参数处理

// Try the following:
//    node index.js n
//    node index.js n fileName
