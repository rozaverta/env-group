declare function envGroup <T = any>(prefix: string, alternative?: any, defaultValues?: Partial<T>): T;
declare function envGroup <T = any>(prefix: string, alternative: (key: string) => string, defaultValues?: Partial<T>): T;
declare namespace envGroup {}
export = envGroup;