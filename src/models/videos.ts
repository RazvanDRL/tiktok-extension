import { FieldValue } from "firebase/firestore";
import { type Dispatch, type SetStateAction } from "react";

export interface IOverlayParams {
    key: string;
    title: string;
    type: string;
    value: string | IArrayPrayers[] | ITrivia[] | number;
    boxType: string;
}

export interface IArrayPrayers {
    pray: string;
    id: string;
    duration: string;
}

export interface ITrivia {
    question: string;
    uid: string;
    answers: IAnswerTrivia[];
}

export interface IAnswerTrivia {
    answer: string;
    uid: string;
    correct: boolean;
}


export enum AspectRatio {
    PORTRAIT = "9:16",
    SQUARE = "1:1",
    LANDSCAPE = "16:9",
}

export interface AddVideoModalProps {
    modalOpen: boolean;
    modalClose: any;
}

export interface AddHooksModalProps {
    modalOpen: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    typeVideo: string;
    mutate?: () => void;
    affiliate?: boolean;
}

export type UploadedFiles = Record<
    AspectRatio,
    {
        files: File[] | null;
        previews: string[] | null;
    }
>;
export interface IFile {
    fileName: string;
    fileURL: string;
    approved?: boolean;
    reason?: string;
    duration?: number;
    potentialDuplicates?: IVideo[];
}

export interface IFullSize {
    fileName: string;
    fileURL: string;
    format: string;
}
export interface ICaption {
    template: string;
    position: string;
    color?: string;
    backgroundColor?: string;
    highlightBackgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
}
export interface IContent {
    language: string;
    text: string;
    transcription: string;
}

export interface IAudio {
    addedOn: FieldValue;
    companyId: string;
    name: string;
    language: string;
    uploaded_by: string;
    userId: string;
    fileName?: string;
    fileURL?: string;
    _firestore_id?: string;
    tiktokSongLink?: string;
    tiktokSongName?: string;
}

export interface IOverlay {
    addedOn: Date;
    _firestore_id: string;
    companyId: string;
    layers: string[];
    fileName: string;
    fileURL: string;
    name: string;
    uploaded_by: string;
    userId: string;
    language: string;
    compositionId: string;
    isCanvas?: boolean;
    params?: IOverlayParams[];
    outputExtension?: string;
    generationType?: string;
    type?: string;
    prompt?: string;
    preview?: {
        fileName: string;
        fileURL: string;
        format: string;
        fullSize: IFullSize;
    };
    raw_video?: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    overlayId?: string;
    id?: string;
}

export interface IVoice {
    content: IContent;
    script_id: string;
    srtFileName: string;
    srtFileURL: string;
    voiceFileName: string;
    voiceName: string;
    voiceURL: string;
}

export interface ICta {
    _firestore_id: string;
    companyId: string;
    duration: number;
    extracted_texts: string[];
    extracted_timestamp: Date;
    language: string;
    preview: {
        fileName: string;
        fileURL: string;
        format: string;
        fullSize: IFullSize;
    };
    raw_video: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    status: string;
    status_updated: Date;
    uploaded_by: string;
    used_count: number;
    userId: string;
    video: string;
}

export interface IBody {
    _firestore_id: string;
    companyId: string;
    duration: number;
    extracted_texts: string[];
    extracted_timestamp: Date;
    language: string;
    preview: {
        fileName: string;
        fileURL: string;
        format: string;
        fullSize: IFullSize;
    };
    raw_video: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    status: string;
    status_updated: Date;
    uploaded_by: string;
    used_count: number;
    userId: string;
    video: string;
}

export interface IHook {
    addedOn: IAddedOn;
    _firestore_id: string;
    companyId: string;
    duration: number;
    language: string;
    excellent_count: number;
    good_count: number;
    preview: {
        fileName: string;
        fileURL: string;
        format: string;
        fullSize: IFullSize;
    };
    raw_video: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    status: string;
    status_updated: Date;
    uploaded_by: string;
    used_count: number;
    userId: string;
    video: string;
}

export interface IFacebookVideo {
    item_id: string;
    user_info: {
        account_id: string;
    };
    video_info: {
        resolution: string;
        video_id: string;
    };
}

export interface IVideoPreview {
    fileName: string;
    fileURL: string;
    format: string;
    fullSize: IFullSize;
}

export interface ITiktokVideo {
    portrait?: {
        format: string;
        image_id: string;
        image_url: string;
        material_id: string;
        size: number;
    };
    video_id: string;
    publish_id?: string;
    tiktok_status_post?: string;
}

export interface IAddedOn {
    seconds: number;
    nanoseconds: number;
    _seconds?: number;
}
export interface IVideo {
    addedOn: IAddedOn;
    affiliate: boolean;
    audio_script: string;
    comments: string[];
    feature: string;
    total_spend: number;
    companyId: string;
    configId: string;
    default_plan_id: string;
    description: string;
    experiments: string[];
    extracted_texts: string[];
    extracted_timestamp: Date;
    facebook: IFacebookVideo;
    headlines: string[];
    instructions: string[];
    language: string;
    mix: boolean;
    mixConcept: string;
    part_id: string;
    preview: IVideoPreview;
    primary_text: string;
    raw_video: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    raw_carousel?: {
        portrait?: IFile[];
        square?: IFile[];
        landscape?: IFile[];
        tiktok?: IFile[];
    };
    raw_image?: {
        portrait?: IFile;
        square?: IFile;
        landscape?: IFile;
        tiktok?: IFile;
    };
    snapchat: {
        media: {
            media_id: string;
        };
    };
    status: string;
    stauts_updated: string;
    tags: string[];
    templateFormat: string;
    tiktokSongLink: string;
    uploaded_by: string;
    userId: string;
    video: string;
    _firestore_id: string;
    tiktokAdCode: string;
    duration: number;
    page_id?: string;
    id?: string;
    tiktok?: ITiktokVideo;
    comment_disabled?: boolean;
    duet_disabled?: boolean;
    stitch_disabled?: boolean;
    content_disclosure_settings?: boolean;
    your_brand?: boolean;
    branded_content?: boolean;
    privacy_level_options?: string;
    video_id?: string;
    resolution?: string;
    size?: number;
    extension?: string;
}

export interface IWebsites {
    facebook: string;
    snapchat: string;
    tiktok: string;
}
export interface IParams {
    [key: string]: BaseParams;
}

export interface BaseParams {
    aid: string;
    life_challange: string;
    placement: string;
    utm_campaign: string;
    utm_source: string;
}
