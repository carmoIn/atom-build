'use strict';

var fs = require('fs');

module.exports.isEligable = function (pathFile) {
  var editor = atom.workspace.getActiveTextEditor();
  if (editor && 'untitled' !== editor.getTitle()) {
      var activeFileDir = path.dirname(fs.realpathSync(editor.getPath()));
      if (fs.existsSync(activeFileDir + '/.atom-build.json')) {
          return fs.existsSync(activeFileDir + '/.atom-build.json');
      }
  }
  return fs.existsSync(pathFile + '/.atom-build.json');
};

module.exports.settings = function (pathFile) {
  var realAtomBuild = fs.realpathSync(pathFile + '/.atom-build.json');
  var editor = atom.workspace.getActiveTextEditor();
  if (editor && 'untitled' !== editor.getTitle()) {
      var activeFileDir = path.dirname(fs.realpathSync(editor.getPath()));
      if (fs.existsSync(activeFileDir + '/.atom-build.json')) {
        realAtomBuild = fs.realpathSync(activeFileDir + '/.atom-build.json');
      }
  }
  delete require.cache[realAtomBuild];

  var build = require(realAtomBuild);
  return {
    exec: build.cmd,
    env: build.env,
    args: build.args,
    cwd: build.cwd,
    sh: build.sh,
    errorMatch: build.errorMatch,
    execute: build.execute,
    executePath: build.executePath,
    executeArgs: build.executeArgs
  };
};
