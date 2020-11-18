import React, {useState} from 'react';
import './App.css';
// @ts-ignore
import attSnd from './sound/attention.wav';
// @ts-ignore
import snd2 from './sound/numbers/2.wav';
// @ts-ignore
import snd3 from './sound/numbers/3.wav';
// @ts-ignore
import freeSnd from './sound/free.wav';
// @ts-ignore
import snd7 from './sound/numbers/7.wav';
// @ts-ignore
import jSnd from './sound/letters/j.wav';
// @ts-ignore
import snd22 from './sound/numbers/22.wav';
// @ts-ignore
import errSnd from './sound/err.wav';
// @ts-ignore
import stopSnd from './sound/stop.wav';
// @ts-ignore
import aSnd from './sound/letters/a.wav';
// @ts-ignore
import xSnd from './sound/letters/x.wav';
import SoundPlayer from "components/sound-player/sound-player";


const App: React.FunctionComponent = (): React.ReactElement => {
    const [sounds, setSounds] = useState<string[]>([]);

    const playSounds = (tracks: string): void => {
        switch (tracks) {
            case 'first':
                setSounds([errSnd, stopSnd, aSnd, xSnd]);
                return;
            case 'second':
                setSounds([attSnd, snd2, snd3]);
                return;
            case 'third':
                setSounds([freeSnd, snd7, jSnd, snd22]);
                return;
        }
    };
    const soundFinish = (): void => {
        console.log('play finish', `sounds: ${sounds}`)
    };
    return (
        <React.Fragment>
            <div style={{margin: 15}}>
                <h1>{'This is sound player'}</h1>
                <div style={{width: 250, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button onClick={() => playSounds('first')}>{'play first'}</button>
                    <button onClick={() => playSounds('second')}>{'play second'}</button>
                    <button onClick={() => playSounds('third')}>{'play third'}</button>
                </div>
            </div>
            <SoundPlayer isExternalSound={false} sounds={sounds} onFinished={soundFinish}/>
        </React.Fragment>
    );
};

export default App;