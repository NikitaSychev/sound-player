export interface ISoundPlayerProps {
    isExternalSound: boolean
    sounds: string[]
    getSoundAction?: () => void
    onPlay?: () => void
    onFinished?: () => void
}