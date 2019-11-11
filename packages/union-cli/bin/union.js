#!/usr/bin/env node

/* eslint-disable no-unused-expressions */

const yargs = require('yargs');

yargs
  .commandDir('../cmd', { recurse: true })
  .version()
  .help()
  .showHelpOnFail(true, 'Specify --help for available options')
  .argv;
