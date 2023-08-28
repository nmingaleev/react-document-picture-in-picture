import React from 'react';
import { TodosList } from './todos-list';
import { RenderWithPictureInPicture } from './renderWithPictureInPicture';

import './App.css';

function App() {
  return (
    <div className="App">
      <RenderWithPictureInPicture component={TodosList} />
    </div>
  );
}

export default App;
