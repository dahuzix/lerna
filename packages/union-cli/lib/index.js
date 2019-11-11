
const urllib = require('urllib');
const homeDir = require('os').homedir();
const compressing = require('compressing');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const {
  exec, echo, exit, mkdir, cp, cd, rm, pwd,
} = require('shelljs');

// const ora = require('ora');
// const spinner = ora('Loading unicorns').start();

const npmName = '@uf3/platform';
const baseUrl = 'http://nexus3.hundsun.com:6060/repository/npm-public/';
const workspacePath = pwd().stdout;
const templatePath = path.join(homeDir, 'temp/union/template');


const template = {
  path: templatePath,
  apps: path.join(templatePath, 'package/src/apps'),
  package: path.join(templatePath, 'package'),
};

const workspace = {
  path: workspacePath,
  apps: path.join(workspacePath, 'src/apps'),
};


// 删除模板无用的子系统
const deleteApps = ({ excludes = [] }) => {
  let apps = fs.readdirSync(template.apps);
  apps = apps.filter((app) => !excludes.includes(app))
    .map((app) => path.join(template.apps, app));
  rm('-rf', [...apps]);
};

// 更新框架带的子系统
const updateApps = ({ includes = [] }) => {
  const apps = includes.map((app) => path.join(template.apps, app));
  cp('-rf', apps, `${workspace.apps}`);
  echo('更新子系统: omc, demo');
};


// 拼装下载链接
const getTemplateUrl = ({ version = '0.0.1' }) => {
  let url = '';
  if (['latest', ''].includes(version)) {
    url = exec(`npm view ${npmName} .dist.tarball`, { silent: true }).stdout;
    return url;
  }
  url = `${baseUrl}/@uf3/platform/-/platform-${version}.tgz`;
  return url;
};

// 下载npm包
const downloadTemplate = async ({ url }) => {
  echo('-n', `下载模板: ${url}`);
  return new Promise((resolve, reject) => {
    urllib.request(url, {
      streaming: true,
      followRedirect: true,
    })
      .then((result) => {
        echo(`解压模板: ${template.path}`);
        return compressing.tgz.uncompress(result.res, template.path);
      })
      .then(() => {
        echo(`解压完成: ${template.package}`);
        deleteApps({ excludes: ['BIZFRAME', 'demo'] });
        resolve(1);
      })
      .catch((e) => {
        echo(chalk.red(`模板下载失败: ${e} `));
        reject(e);
        exit(1);
      });
  });
};

// 检查
const check = ({ name }) => {
  // 工程是否已存在
  const dest = path.resolve(workspace.path, name);
  if (fs.existsSync(dest)) {
    echo(chalk.red(`工程已存在: ${dest}`));
    exit(1);
  }
};

// 拷贝项目
const copyTemplate = ({ name }) => {
  const dest = path.resolve(workspace.path, name);
  if (fs.existsSync(dest)) {
    echo(chalk.red(`工程已存在: ${dest}`));
    exit(1);
  }
  mkdir(`${dest}`);
  cd(`${template.package}`);
  cp('-rf', ['.'], `${dest}`);
  echo(chalk.green(`创建完成: ${dest}`));
};

// 更新项目
const updateProject = ({ excludes = [] }) => {
  const dest = workspace.path;
  rm('-rf', './union-excludes');
  mkdir('./union-excludes');
  cp('-rf', [...excludes], './union-excludes');
  cd(`${template.package}`);
  cp('-rf', ['.'], `${dest}`);
  cd(`${dest}`);
  rm('-rf', [...excludes]);
  cp('-rf', './union-excludes/*', 'src');
  rm('-rf', './union-excludes');
  echo(chalk.green(`更新完成: ${dest}`));
};

// 导出
const utils = {
  check,
  getTemplateUrl,
  downloadTemplate,
  copyTemplate,
  updateProject,
  updateApps,
};

module.exports = utils;
