/**
 * 初始化一个工程
 */
const {
  check, getTemplateUrl, downloadTemplate, copyTemplate,
} = require('../../lib');

const command = {
  command: 'create',
  desc: '新建一个项目',
  builder: {
    name: {
      alias: 'n',
      desc: '项目名称',
      type: 'string',
      demandOption: true,
      // default: 'my-project',
    },
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
  },
  handler: async (argv) => {
    const { name, templateVersion: version } = argv;
    check({ name });
    const url = getTemplateUrl({ version });
    await downloadTemplate({ url });
    copyTemplate({ name });
  },
};

module.exports = command;
