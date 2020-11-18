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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var SoundPlayer = function (props) {
    var _a = react_1.useState([]), sounds = _a[0], setSounds = _a[1];
    var _b = react_1.useState(false), isFinished = _b[0], setIsFinished = _b[1];
    var _c = react_1.useState([]), sources = _c[0], setSources = _c[1];
    var _d = react_1.useState(0), soundIndex = _d[0], setSoundIndex = _d[1];
    var clearSounds = function () {
        if (sounds.length) {
            setSounds([]);
        }
    };
    var playSound = function (index, onFinished) {
        if (isFinished || !Array.isArray(sounds) || index >= sounds.length) {
            onFinished();
            setIsFinished(true);
            clearSounds();
            setSoundIndex(index);
            return;
        }
        var sound = sounds[index];
        if (sound) {
            sound.play()
                .then(function () {
                setTimeout(function () {
                    playSoundMemo(index + 1, onFinished);
                }, 300);
            })
                .catch(function (err) {
                console.error('error', err.message);
                playSoundMemo(index + 1, onFinished);
            });
        }
    };
    var prepareSounds = function () {
        if (isFinished) {
            return;
        }
        if (!props.isExternalSound) {
            var curSounds_1 = [];
            sources.forEach(function (source) {
                var audio = new Audio(source);
                audio.id = source;
                // audio.autoplay = true;
                if (!sounds.find(function (item) { return item.id === audio.id; })) {
                    curSounds_1.push(audio);
                }
            });
            if (curSounds_1.length) {
                setSounds(curSounds_1);
            }
        }
    };
    var playSoundMemo = react_1.useCallback(playSound, [clearSounds, isFinished, playSound, sounds]);
    react_1.useEffect(function () {
        playSoundMemo(soundIndex, props.onFinished ? props.onFinished : function () { });
        return function () {
            setIsFinished(true);
        };
    }, [playSoundMemo, props.onFinished, soundIndex]);
    react_1.useEffect(function () {
        setSources(props.sounds);
        setIsFinished(false);
    }, [props.sounds]);
    if (!isFinished && Array.isArray(sounds) && sounds.length === 0) {
        prepareSounds();
    }
    return (react_1.default.createElement(react_1.default.Fragment, null));
};
exports.default = SoundPlayer;
