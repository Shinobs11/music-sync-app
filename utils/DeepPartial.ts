//stolen from https://stackoverflow.com/questions/61132262/typescript-deep-partial/61132308
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;