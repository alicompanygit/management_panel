export interface IRecordingState {
    recordings: IRecording[];
    loading: any,
    audioSources: any
}
export interface IRecording {
    recording_filename: string;
    recording_uuid: string;
}
export interface IAddRecording {
    data: IRecordingInfo,
    file: File
}
interface IRecordingInfo {
    Name: string,
    Type: string,
    FileId: string,
}