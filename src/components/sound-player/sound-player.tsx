import React, {useCallback, useEffect, useState} from 'react';
import {ISoundPlayerProps} from './types';
// @ts-ignore
import errSnd from './sound/err.wav';
import IframeAudio from "../iframe-audio/iframe-audio";

const SoundPlayer: React.FunctionComponent<ISoundPlayerProps> = (props: ISoundPlayerProps): React.ReactElement => {
    const [sounds, setSound] = useState<HTMLAudioElement[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const clearSounds = (): void => {
        if (sounds.length) {
            setSound([]);
        }
    }
    const playSound = (index: number, onFinished: () => void) => {
        if (index >= sounds.length || isFinished) {
            onFinished();
            clearSounds();
            return;
        }

        const next = () => playSound(index + 1, onFinished);

        if (props.sounds.length <= index) {
            if (props.sounds[index + 1]) {
                playSound(index + 1, onFinished);
            } else {
                onFinished();
            }
        } else {
            sounds[index].onended = next;
            sounds[index].play();
        }
    }

    const startPlaySound = (): void => {
        if (isFinished) {
            return;
        }
        if (!props.isExternalSound) {
            const curSounds: HTMLAudioElement[] = [];
            props.sounds.forEach(name => {
                const audio = new Audio(
                    errSnd
                    // `../../sound/${name}.wav`
                );

                audio.addEventListener('error', function () {
                    console.log('error', `sound play error`);
                });
                audio.id = errSnd.toString();
                audio.autoplay = true;

                // audio.play()
                //     .then((res) => {
                //         console.log('is play');
                //     })
                //     .catch((err: DOMException) => {
                //         console.error('error', err.message);
                //     });

                // const stl: ElementCSSInlineStyle = {style: {display: 'none'}} as ElementCSSInlineStyle
                //
                // const iframe = {} as HTMLIFrameElement;
                // iframe.src = `${name}.wav`;
                // iframe.allow = 'autoplay';
                // // iframe.style = stl
                // iframe.id = 'iframeAudio';
                //
                // iframe.click();
                if (!sounds.find(item => item.id === audio.id)) {
                    curSounds.push(audio);
                }
            });
            if (curSounds.length) {
                setSound(curSounds);
            }
        }
    }

    const playSoundMemo = useCallback(playSound, [sounds]);

    useEffect(() => {
        playSoundMemo(0, props.onFinished ? props.onFinished : () => {
        });
        return () => {
            setIsFinished(true);
        }
    }, [sounds, playSoundMemo, props.onFinished])

    startPlaySound();

    // return (
    //     <IframeAudio sound={errSnd}/>
    // );
    return (
        <></>
    );
}

export default SoundPlayer;
// <button onClick={startPlaySound}>{'Старт'}</button>
// return (
//     <React.Fragment>
//         <div>{'Ghbdtn!'}</div>
//     </React.Fragment>
// );