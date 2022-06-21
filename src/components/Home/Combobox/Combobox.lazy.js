import React, { lazy, Suspense } from 'react';

const LazyCombobox = lazy(() => import('./Combobox'));

const Combobox = props => (
  <Suspense fallback={null}>
    <LazyCombobox {...props} />
  </Suspense>
);

export default Combobox;
