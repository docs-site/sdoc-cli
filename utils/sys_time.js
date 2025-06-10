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

/**
 * @brief 获取当前日期时间字符串
 * @return {string} 格式化的日期时间字符串 (YYYY-MM-DD HH:MM:SS)
 */
function getCurrentDateTime() {
	const now = new Date();

	// 使用 padStart(2, '0') 确保单数位数字补零（如 9 → 09）
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始需+1
	const day = String(now.getDate()).padStart(2, '0');

	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 组合成目标格式
}

/** 
 * @brief 模块导出对象
 * @property {function} getCurrentDateTime 获取当前日期时间的函数
 */
module.exports = {
	getCurrentDateTime
};

// console.log("当前时间:", getCurrentDateTime());
