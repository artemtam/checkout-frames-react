import { FramesObject } from './types';

declare global {
    interface Window {
        Frames: FramesObject;
    }
}
