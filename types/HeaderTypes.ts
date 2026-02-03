type profileType = {
    avatar: string;
    bgcolor:string;
    title: string;
    subtitle: string;
    href: string;
};

type languageType = {
    avatar: string;
    title: string;
    subtext: string;
    value: string;
    rtl: boolean;
};

type optionIcon = {
    title: string;
    iconcolor: string;
};

export type { profileType, languageType, optionIcon }