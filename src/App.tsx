import React from 'react';
import './App.css';
import SoundPlayer from "./components/sound-player/sound-player";

const App: React.FunctionComponent = (): React.ReactElement => {
  return (
      <React.Fragment>
        <h1>{'This is sound player'}</h1>
        <SoundPlayer isExternalSound={false} sounds={['err']}/>
      </React.Fragment>
  );
};

export default App;
