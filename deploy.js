/* eslint-disable strict, max-len, no-console */

'use strict';

const exec = require('child_process').exec;
const chalk = require('chalk');

const done = msg => console.log(chalk.green(msg));
const abort = (err) => {
  console.log(chalk.red(err));
  process.exit(-1);
};

function verifyGitStatus() {
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow('Verifying git status.'));

    exec('git status --porcelain',
      (err, stdout) => {
        let uncommited = stdout.trim().split(/\r|\n/);
        uncommited = uncommited.filter(line => line.length > 0);

        if (err) reject('Could not execute git status, are you sure a git repo exists?');
        if (uncommited.length >= 1) reject(`You have ${uncommited.length} uncommited file(s). Please make sure you commit everything or stage changes before deploying.`);

        resolve('Git status OK!');
      }
    );
  })
  .then(done)
  .catch(abort);
}

const sequence = [
  verifyGitStatus,
];

sequence
  .reduce((cur, next) => cur.then(next), Promise.resolve())
  .then(() => done('Deploy finished!'));
