import React from 'react';

const FullpageContext = React.createContext({
  number: 0,
  count: 0,
  subscribe: null,
  unsubscribe: null,
  goto: null,
  back: null,
  next: null,
});

export default FullpageContext;
