import React from 'react';

import Routes from './routes';

import {defineLocales, defaultLocale} from './services/calendar';

defineLocales();
defaultLocale('pt');

const App = () => {
  return <Routes />;
};

export default App;
