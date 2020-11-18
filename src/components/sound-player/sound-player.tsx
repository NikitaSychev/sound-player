import React, {useCallback, useEffect, useState} from 'react';
import {ISoundPlayerProps} from "./types";

const SoundPlayer: React.FunctionComponent<ISoundPlayerProps> = (props: ISoundPlayerProps): React.ReactElement => {
    const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [sources, setSources] = useState<string[]>([]);
    const [soundIndex, setSoundIndex] = useState<number>(0);

    const clearSounds = (): void => {
        if (sounds.length) {
            setSounds([]);
        }
    }
    const playSound = (index: number, onFinished: () => void) => {
        if (isFinished || !Array.isArray(sounds) || index >= sounds.length) {
            onFinished();
            setIsFinished(true);
            clearSounds();
            setSoundIndex(index);
            return;
        }
        const sound = sounds[index];
        if (sound) {
            sound.play()
                .then(() => {
                    setTimeout(() => {
                        playSoundMemo(index + 1, onFinished);
                    }, 300);
                })
                .catch((err: DOMException) => {
                    console.error('error', err.message);
                    playSoundMemo(index + 1, onFinished);
                });
        }
    }

    const prepareSounds = (): void => {
        if (isFinished) {
            return;
        }
        if (!props.isExternalSound) {
            const curSounds: HTMLAudioElement[] = [];
            sources.forEach(source => {
                const audio = new Audio(source);
                audio.id = source;
                // audio.autoplay = true;

                if (!sounds.find(item => item.id === audio.id)) {
                    curSounds.push(audio);
                }
            });
            if (curSounds.length) {
                setSounds(curSounds);
            }
        }
    }

    const playSoundMemo = useCallback(playSound, [clearSounds, isFinished, playSound, sounds]);

    useEffect(() => {
        playSoundMemo(soundIndex, props.onFinished ? props.onFinished : () => {});
        return () => {
            setIsFinished(true);
        }
    }, [playSoundMemo, props.onFinished, soundIndex]);

    useEffect(() => {
        setSources(props.sounds);
        setIsFinished(false);
    }, [props.sounds]);

    if (!isFinished && Array.isArray(sounds) && sounds.length === 0) {
        prepareSounds();
    }

    return (
        <></>
    );
}

export default SoundPlayer;