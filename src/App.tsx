import React from 'react';
import Home from './screens/Home';
import { Leva } from 'leva';

function App(): JSX.Element {
  return (
    <div className="w-full h-screen">
      <Home />
      <div className="absolute overflow-auto top-2 left-2 max-h-96">
        <Leva collapsed fill />
      </div>
    </div>
  );
}

export default App;
