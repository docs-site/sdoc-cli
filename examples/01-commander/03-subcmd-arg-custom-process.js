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
 * @brief 自定义参数处理函数，将字符串转换为整数
 * @param {string} value 要转换的字符串值
 * @return {number} 转换后的整数值
 * @throws {commander.InvalidArgumentError} 当输入不是有效数字时抛出
 */
function myParseInt(value) {
	// parseInt takes a string and a radix
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		throw new InvalidArgumentError('Not a number.');
	}
	return parsedValue;
}

/**
 * @brief 计算累加和的函数
 * @param {string} value 当前要累加的值
 * @param {number} total 当前累加和
 * @return {number} 新的累加和
 * @throws {commander.InvalidArgumentError} 当输入不是有效数字时抛出
 */
function mySum(value, total) {
  return total + myParseInt(value);
}


/** 
 * @brief 添加"add"子命令及其参数和动作 
 */
program
	.command('add')
	.argument('<first>', 'integer argument', myParseInt)
	.argument('[second]', 'integer argument', myParseInt, 1000)
	.action((first, second) => {
		console.log(`${first} + ${second} = ${first + second}`);
	});

/** 
 * @brief 添加"sum"子命令及其参数和动作 
 */
program
  .command('sum')
  .argument('<value...>', 'values to be summed', mySum, 0)
  .action((total) => {
    console.log(`sum is ${total}`);
  });


program.parse(); // 参数处理

// Try the following:
//    node 03-subcmd-arg-custom-process.js add --help
//    node 03-subcmd-arg-custom-process.js add 2
//    node 03-subcmd-arg-custom-process.js add 12 56
//    node 03-subcmd-arg-custom-process.js sum 1 2 3
//    node 03-subcmd-arg-custom-process.js sum silly
