# UNION-CLI 前端脚手架

[TOC]

## 简介

union-cli 是一款快速创建前端项目的命令行脚手架，使用的模板为uf3-platform，npm发布包为 @union/cli

## 环境准备

```js
// 安装npm
npm -v
npm install -g npm

// 安装镜像源管理工具nrm
npm install -g nrm

// 添加公司镜像仓库
nrm add hsnpm http://nexus3.hundsun.com:6060/repository/npm-public/

// npm镜像源切换为公司仓库
nrm use hsnpm
```

## 安装脚手架

```js
// 全局安装脚手架
npm install -g @union/cli

// 查看版本
union --version
```

## 使用帮助

```js
// 安装完成就可以在哪命令行使用 union 命令了
union --version

// 命令帮助
union --help

// eg 命令行输入：
union --help

// 窗口输出:
union [命令]

命令：
  union create  新建一个项目
  union update  更新一个项目

选项：
  --version  显示版本号                                                   [布尔]
  --help     显示帮助信息                                                 [布尔]
```

## Examples

### 项目创建

```js
创建项目命令帮助：
union create --help

// 创建demo工程
union create --name demo

// 安装项目依赖
cd demo
npm install
```

### 项目更新

```js
// 项目更新命令，用来更新基础框架
union update --help

// demo 项目根目录下
cd demo
union update
```
