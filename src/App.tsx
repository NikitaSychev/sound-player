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
import SoundPlayer from "./components/sound-player/sound-player";
import {TFileType} from "./components/sound-player/types";

const App: React.FunctionComponent = (): React.ReactElement => {
    const [sounds, setSounds] = useState<string[]>([]);
    const [filesType, setIsExternalSound] = useState<TFileType>('Local');

    const playSounds = (tracks: string): void => {
        switch (tracks) {
            case 'first':
                setIsExternalSound('Local');
                setSounds([errSnd, stopSnd, aSnd, xSnd]);
                return;
            case 'second':
                setIsExternalSound('Local');
                setSounds([attSnd, snd2, snd3]);
                return;
            case 'third':
                setIsExternalSound('Local');
                setSounds([freeSnd, snd7, jSnd, snd22]);
                return;
            case 'fourth':
                setIsExternalSound('Remote');
                setSounds(['10', '12', '02', '30']);
                return;
            case 'fifth':
                setIsExternalSound('Remote');
                setSounds(['45', '55', '01']);
                return;
            case 'sixth':
                setIsExternalSound('Remote');
                setSounds(['99', '12', '78', '04']);
                return;
            default:
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
                <h3>{'Local files'}</h3>
                <div style={{width: 250, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button onClick={() => playSounds('first')}>{'play first'}</button>
                    <button onClick={() => playSounds('second')}>{'play second'}</button>
                    <button onClick={() => playSounds('third')}>{'play third'}</button>
                </div>
                <h3>{'Remote files'}</h3>
                <div style={{width: 250, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <button onClick={() => playSounds('fourth')}>{'play fourth'}</button>
                    <button onClick={() => playSounds('fifth')}>{'play fifth'}</button>
                    <button onClick={() => playSounds('sixth')}>{'play sixth'}</button>
                </div>
            </div>
            <SoundPlayer isExternalSound={filesType} sounds={sounds} onFinished={soundFinish}/>
        </React.Fragment>
    );
};

export default App;
