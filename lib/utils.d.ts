export declare const log: {
    info: (text: string, br?: boolean) => void;
    ok: (text: string, br?: boolean) => void;
    error: (text: string, key?: boolean, br?: boolean) => void;
    cmd: (text: string) => void;
};
export declare const checkFolder: (filePath: string, fn: () => void) => void;
export declare const initRepositry: (templateName: any, projectFolder: string, fn: () => void) => void;
