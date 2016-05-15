var System = require('../../systemjs');

System.transpiler = 'traceur';

// loads './app.js' from the current directory
System.import('../lib/main.js').then(function(m) {
  m.main();
});
