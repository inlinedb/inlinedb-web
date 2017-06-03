require('file-loader?name=readme.md!./readme-io.md');
require('file-loader?name=license.md!../license.md');
require('file-loader?name=.gitignore!../.gitignore');

require('./index.scss');

document.querySelector('main#content').innerHTML = `
  ${require('./components/navigation.html')}
  ${require('./components/intro.html')}
  ${require('inlinedb-docs')}
`;
