require('./index.scss');

document.querySelector('main#content').innerHTML = `
  ${require('./components/navigation.html')}
  ${require('./components/intro.html')}
  ${require('inlinedb-docs')}
`;
