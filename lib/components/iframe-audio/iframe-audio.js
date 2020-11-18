"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var IframeAudio = function (props) {
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
    var clickDiv = function (element) {
        if (element) {
            element.click();
        }
    };
    var isClicked = function () {
        console.log('clicked');
    };
    // return elem;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("iframe", { title: '123', allow: "autoplay", hidden: true, src: props.sound, ref: clickDiv, onClick: function () { return isClicked(); } })));
};
//<div ref={clickDiv} onClick={() => isClicked()}/>
exports.default = IframeAudio;
