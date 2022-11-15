import React from 'react';
import Home from './screens/home/Home';
import { Leva } from 'leva';

function App(): JSX.Element {
  return (
    <div className="w-full h-screen">
      <Home />
      <Leva />
    </div>
  );
}

export default App;
