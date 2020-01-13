import React from 'react';

export interface FramesEvents {
    READY: 'ready';
    FRAME_ACTIVATED: 'frameActivated';
    FRAME_FOCUS: 'frameFocus';
    FRAME_BLUR: 'frameBlur';
    FRAME_VALIDATION_CHANGED: 'frameValidationChanged';
    PAYMENT_METHOD_CHANGED: 'paymentMethodChanged';
    CARD_VALIDATION_CHANGED: 'cardValidationChanged';
    CARD_SUBMITTED: 'cardSubmitted';
    CARD_TOKENIZED: 'cardTokenized';
    CARD_TOKENIZATION_FAILED: 'cardTokenizationFailed';
}

export type FramesSupportedLanguage =
    'EN-GB'
    | 'ES-ES'
    | 'DE-DE'
    | 'KR-KR'
    | 'FR-FR'
    | 'IT-IT'
    | 'NL-NL';

export interface FramesStyle {
    base?: React.CSSProperties;
    valid?: React.CSSProperties;
    invalid?: React.CSSProperties;
    focus?: React.CSSProperties;
    placeholder?: React.CSSProperties;
}

export interface FramesBillingAddress {
    addressLine1: string;
    addressLine2: string;
    zip: string;
    city: string;
    state: string;
    country: string;
}

export interface FramesBillingDetails {
    name: string;
    billingAddress: FramesBillingAddress;
    phone: string;
}

export interface FramesInitProps {
    publicKey: string;
    debug?: boolean;
    namespace?: string;
    frameSelector?: null;
    localization?: FramesSupportedLanguage;
    style?: FramesStyle;
}

export interface FramesObject {
    Events: FramesEvents;
    init: (props: FramesInitProps) => void;

    isCardValid: () => boolean;
    submitCard: () => Promise<void>;

    addEventHandler: (event: FramesEvents[keyof FramesEvents],
                      eventHandler: (event: any) => void) => void;
    removeEventHandler: (event: FramesEvents[keyof FramesEvents],
                         eventHandler: (event: any) => void) => boolean;

    removeAllEventHandlers: (event: FramesEvents[keyof FramesEvents]) => boolean;

    enableSubmitForm: () => void;

    publicKey: string;
    cardholder: FramesBillingDetails;


    readonly debugMode: boolean;
    readonly namespace: boolean;
    readonly version: boolean;
    readonly localization: FramesSupportedLanguage;
    readonly config: any;
}
