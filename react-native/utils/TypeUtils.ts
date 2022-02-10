//stolen from https://stackoverflow.com/questions/61132262/typescript-deep-partial/61132308
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


//https://www.petermorlion.com/iterating-a-typescript-enum/
/**
 * Cute little util i found to help with enumerating keys. 
 * Man I wish I was this good at ts
 */
 export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}


