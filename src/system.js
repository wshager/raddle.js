var System = require('systemjs');

System.config({
    baseURL:'../node_modules',
    transpiler:'traceur',
    map: {
        lib: './lib',
        immutable:'immutable',
        xregexp:'xregexp',
        'decimal.js':'decimal.js',
        'bignumber.js':'bignumber.js',
        xml2js:'xml2js',
        text: 'system-text'
    },
    packageConfigPaths: ['../node_modules/*/package.json',]
});
//System.baseURL = '../lib';
// loads './app.js' from the current directory
System.import('./main.js').then(function(m) {
    console.log(m.main());
  //console.log(m.main().toString());
},function(e){
    console.log(e);
});
