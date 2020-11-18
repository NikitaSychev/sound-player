"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./App.css");
// @ts-ignore
var attention_wav_1 = __importDefault(require("./sound/attention.wav"));
// @ts-ignore
var _2_wav_1 = __importDefault(require("./sound/numbers/2.wav"));
// @ts-ignore
var _3_wav_1 = __importDefault(require("./sound/numbers/3.wav"));
// @ts-ignore
var free_wav_1 = __importDefault(require("./sound/free.wav"));
// @ts-ignore
var _7_wav_1 = __importDefault(require("./sound/numbers/7.wav"));
// @ts-ignore
var j_wav_1 = __importDefault(require("./sound/letters/j.wav"));
// @ts-ignore
var _22_wav_1 = __importDefault(require("./sound/numbers/22.wav"));
// @ts-ignore
var err_wav_1 = __importDefault(require("./sound/err.wav"));
// @ts-ignore
var stop_wav_1 = __importDefault(require("./sound/stop.wav"));
// @ts-ignore
var a_wav_1 = __importDefault(require("./sound/letters/a.wav"));
// @ts-ignore
var x_wav_1 = __importDefault(require("./sound/letters/x.wav"));
var sound_player_1 = __importDefault(require("./components/sound-player/sound-player"));
var App = function () {
    var _a = react_1.useState([]), sounds = _a[0], setSounds = _a[1];
    var playSounds = function (tracks) {
        switch (tracks) {
            case 'first':
                setSounds([err_wav_1.default, stop_wav_1.default, a_wav_1.default, x_wav_1.default]);
                return;
            case 'second':
                setSounds([attention_wav_1.default, _2_wav_1.default, _3_wav_1.default]);
                return;
            case 'third':
                setSounds([free_wav_1.default, _7_wav_1.default, j_wav_1.default, _22_wav_1.default]);
                return;
        }
    };
    var soundFinish = function () {
        console.log('play finish', "sounds: " + sounds);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { style: { margin: 15 } },
            react_1.default.createElement("h1", null, 'This is sound player'),
            react_1.default.createElement("div", { style: { width: 250, display: "flex", flexDirection: "row", justifyContent: "space-between" } },
                react_1.default.createElement("button", { onClick: function () { return playSounds('first'); } }, 'play first'),
                react_1.default.createElement("button", { onClick: function () { return playSounds('second'); } }, 'play second'),
                react_1.default.createElement("button", { onClick: function () { return playSounds('third'); } }, 'play third'))),
        react_1.default.createElement(sound_player_1.default, { isExternalSound: false, sounds: sounds, onFinished: soundFinish })));
};
exports.default = App;
