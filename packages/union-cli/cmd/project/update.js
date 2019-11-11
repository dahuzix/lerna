/**
 * 初始化一个工程
 */
const inquirer = require('inquirer');
const {
  getTemplateUrl, downloadTemplate, updateProject, updateApps,
} = require('../../lib');

const command = {
  command: 'update',
  desc: '更新一个项目',
  builder: {
    template: {
      alias: 't',
      desc: '项目模板',
      type: 'string',
      choices: ['@uf3/platform'],
      demandOption: false,
      default: '@uf3/platform',
    },
    'template-version': {
      alias: 'tpl-v',
      desc: '项目模板版本',
      type: 'string',
      demandOption: false,
      default: 'latest',
    },
    'with-custom': {
      alias: 'c',
      desc: '是否覆盖src/custom',
      type: 'boolean',
      demandOption: false,
      default: undefined,
    },
  },
  handler: async (argv) => {
    const { templateVersion: version, withCustom } = argv;

    let coverCustom = withCustom;

    if (withCustom === undefined) {
      const answers = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'custom',
            message: '是否覆盖src/custom ?',
            choices: [
              { name: '否', value: false },
              { name: '是', value: true },
            ],
          },
        ]);
      coverCustom = answers.custom;
    }

    const excludes = ['src/apps'];
    if (!coverCustom) {
      excludes.push('src/custom');
    }
    const url = getTemplateUrl({ version });
    await downloadTemplate({ url });
    // 更新子系统
    updateApps({ includes: ['BIZFRAME', 'demo'] });
    // 更新主框架;
    updateProject({ excludes });
  },
};

module.exports = command;
