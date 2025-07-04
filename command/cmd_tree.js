#!/usr/bin/env node
/** =====================================================
 * Copyright © hk. 2022-2025. All rights reserved.
 * File name  : cmd_tree.js
 * Author     : 苏木
 * Date       : 2025-06-10
 * Version    : 
 * Description: 实现sdoc tree命令，打印目录树结构
 * ======================================================
 */
const fs = require('fs');
const path = require('path');

/**
 * @brief 生成目录树结构并统计文件/文件夹数量
 * @param {string} dirPath 要遍历的目录路径
 * @param {string} [prefix=''] 当前层级的前缀字符串，用于缩进和连接线
 * @param {boolean} [isLast=true] 当前项是否是父目录的最后一项
 * @param {number} [maxDepth=Infinity] 最大递归深度限制
 * @param {number} [currentDepth=0] 当前递归深度
 * @return {Object} 包含文件夹和文件数量的统计对象 {dirCount: number, fileCount: number}
 */
function generateTree(dirPath, prefix = '', isLast = true, maxDepth = Infinity, currentDepth = 0) {
    // 同步读取目录内容
    const files = fs.readdirSync(dirPath);
    const count = files.length;
    let dirCount = 0;
    let fileCount = 0;
    
    // 遍历目录中的每个文件/子目录
    files.forEach((file, index) => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);  // 获取文件状态信息
        const isCurrentLast = index === count - 1;  // 是否是当前目录的最后一项
        
        // 构建当前项的连接线
        let line = prefix;  // 继承父级前缀
        line += isCurrentLast ? '└── ' : '├── ';  // 添加当前项连接符号
        line += file;  // 添加文件名
        
        console.log(line);  // 输出当前项

        // 统计文件/文件夹数量
        if (stats.isDirectory()) {
            dirCount++;
            // 如果是目录且未达到最大深度限制，则递归处理
            if (currentDepth < maxDepth - 1) {
                // 计算子项前缀：添加适当的缩进和连接线
                const childPrefix = prefix + (isCurrentLast ? '    ' : '│   ');
                const subCounts = generateTree(fullPath, childPrefix, isCurrentLast, maxDepth, currentDepth + 1);
                dirCount += subCounts.dirCount;
                fileCount += subCounts.fileCount;
            }
        } else {
            fileCount++;
        }
    });
    
    return {dirCount, fileCount};
}

/**
 * @brief 执行tree命令的主函数
 * @param {Object} [options={}] 命令行选项对象
 * @param {number} [options.depth] 最大目录深度限制
 * @return {void} 无返回值
 * @note 执行成功时退出码为0，失败时为1
 */
function main(options = {}) {
    try {
        const currentDir = process.cwd();
        console.log(path.basename(currentDir));
        const counts = generateTree(currentDir, '', true, options.depth || Infinity);
        console.log(`\n${counts.dirCount} directories, ${counts.fileCount} files`);
        process.exit(0); // 确保程序正常退出
    } catch (err) {
        console.error('执行tree命令出错:', err);
        process.exit(1);
    }
}

/**
 * @brief 模块导出对象
 * @property {function} generateTree 生成目录树结构的函数
 * @property {function} main 执行tree命令的主函数
 */
module.exports = {
    generateTree,
    main
};

/**
 * @brief 直接执行检查
 * @description 当文件被直接执行而非require导入时，自动运行main函数
 */
if (require.main === module) {
    main();
}
