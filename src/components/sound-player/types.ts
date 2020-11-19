export type TFileType = 'Local' | 'Remote';

export interface ISoundPlayerProps {
    isExternalSound: TFileType
    sounds: string[]
    getSoundAction?: () => void
    onPlay?: () => void
    onFinished?: () => void
};
