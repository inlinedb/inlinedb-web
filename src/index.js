require('./index.scss');

document.querySelector('main#content').innerHTML = `
  ${require('./components/navigation.html')}
  ${require('./components/header.html')}
  ${require('inlinedb-docs')}
  ${require('./components/footer.html')}
  ${require('./components/analytics.html')}
`;
