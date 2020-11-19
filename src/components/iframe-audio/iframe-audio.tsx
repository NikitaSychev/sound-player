import React from "react";
import {IIframeAudioProps} from "./types";

const IframeAudio: React.FunctionComponent<IIframeAudioProps> = (props: IIframeAudioProps): React.ReactElement => {

    // const elem: React.ReactElement = <React.Fragment>
    //     <video id='myaudio' preload='auto' hidden>
    //         <source src={props.sound}/>
    //     </video>
    // </React.Fragment>;
    //
    // useEffect(() => {
    //     const aud = document.getElementById('myaudio') as HTMLVideoElement;
    //     if (aud) {
    //         aud.volume = 0.2;
    //         aud.play().catch(err => {console.log('error')});
    //     }
    // }, [elem])

    const clickDiv = (element: HTMLIFrameElement): void => {
        if (element) {
            element.click();
        }
    }
    const isClicked = (): void => {
        console.log('clicked');
    }

    // return elem;

    return (
        <React.Fragment>
            <iframe title={'123'} allow="autoplay" hidden src={props.sound} ref={clickDiv} onClick={() => isClicked()}/>
        </React.Fragment>
    );
};
//<div ref={clickDiv} onClick={() => isClicked()}/>
export default IframeAudio;
