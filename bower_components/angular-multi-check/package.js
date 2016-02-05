Package.describe({
  name: 'ndxbxrme:angular-multi-check',
  version: '0.6.0',
  summary: 'an angular multi-checkbox directive',
  git: 'https://github.com/ndxbxrme/angular-multi-check',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('angular:angular@1.4.4', 'client');
  api.addFiles('dist/multi-check.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ndxbxrme:angular-multi-check');
  api.addFiles('test/meteor-tests.js');
});