import React, {useCallback, useEffect, useState} from 'react';
import {ISoundPlayerProps} from "./types";


const soundUrl = 'https://raw.githubusercontent.com/batrakov/hh/master/SoundPlayer/Sounds';

const SoundPlayer: React.FunctionComponent<ISoundPlayerProps> = (props: ISoundPlayerProps): React.ReactElement => {
    const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);
    const [isFinished, setIsFinished] = useState<boolean | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const [soundIndex, setSoundIndex] = useState<number>(0);

    const clearSounds = (): void => {
        if (sounds.length) {
            setSounds([]);
        }
    };
    const playSound = (index: number) => {
        if (isFinished === null) {
            return;
        }
        if (isFinished || !Array.isArray(sounds) || index >= sounds.length) {
            setIsFinished(true);
            clearSounds();
            setSoundIndex(index);
            return;
        }
        const sound = sounds[index] as HTMLAudioElement;
        if (sound instanceof HTMLAudioElement) {
            sound.onended = (el: Event) => {
                console.log('ended', (el.target as HTMLAudioElement)?.id);
                setTimeout(() => {
                    playSoundMemo(index + 1);
                }, 50);
            };
            sound.play()
                .catch((err: DOMException) => {
                    console.error('error', err.message);
                    playSoundMemo(index + 1);
                });
        }
    };

    const setAudioToLocalStorage = (audio: HTMLAudioElement): void => {
        if (audio) {
            localStorage.setItem(audio.id, JSON.stringify(audio));
        }
    };

    const prepareRemoteAudio = (source: string): HTMLAudioElement => {
        if (props.isExternalSound === 'Local') {
            return new Audio(source);
        }
        const audio = localStorage.getItem(`${source}_${props.isExternalSound}`);
        let result = audio ? JSON.parse(audio) as HTMLAudioElement : null;
        if (result instanceof HTMLAudioElement) {
            return result;
        }
        result = new Audio(`${soundUrl}/RobotMale/${source}.wav`);
        result.onloadeddata = (el: Event) => {
            setAudioToLocalStorage(el.target as HTMLAudioElement);
        };
        return result;
    };

    const prepareSounds = (): void => {
        if (isFinished || !props.isExternalSound) {
            return;
        }
        const curSounds: HTMLAudioElement[] = [];
        sources.forEach(source => {
            const audio = props.isExternalSound === 'Local'
                ? new Audio(source)
                : new Audio(`${soundUrl}/RobotMale/${source}.wav`);

            audio.id = `${source}_${props.isExternalSound}`;
            // audio.autoplay = true;

            if (!sounds.find(item => item.id === audio.id)) {
                curSounds.push(audio);
            }
        });
        if (curSounds.length) {
            setSounds(curSounds);
        }
    };

    const playSoundMemo = useCallback(playSound, [clearSounds, isFinished, playSound, sounds]);

    useEffect(() => {
        playSoundMemo(soundIndex);
    }, [playSoundMemo, soundIndex]);

    useEffect(() => {
        if (Array.isArray(props.sounds) && props.sounds.length > 0) {
            setSources(props.sounds);
            setIsFinished(false);
            setSoundIndex(0);
        }
    }, [props.sounds]);

    useEffect(() => {
        if (isFinished && props.onFinished) {
            props.onFinished();
            setIsFinished(null);
        }
    }, [props, props.onFinished, isFinished]);

    if (isFinished === false && Array.isArray(sounds) && sounds.length === 0) {
        prepareSounds();
    }

    return (
        <></>
    );
};

export default SoundPlayer;
