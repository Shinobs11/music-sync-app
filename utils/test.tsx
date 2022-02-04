

interface type1
{
    a: number,
    b: string,
    c: string,
    d: [string, number]
}

interface type2{
    a: number,
    b:string,
    c: string,
    d:[string, number],
    e:[number, string]
}

type type3 = Pick<type1, "a" | "b" | "c" | "d">;


const type1Obj:type1 = {
    a: 10,
    b:"20",
    c: "30",
    d: ["40", 50]
}

const type2Obj:type2 = {
    a: 100,
    b: "200",
    c: "300",
    d: ["400", 500],
    e: [600, "700"]
}

Object.assign(type2Obj, type1Obj);

var result:Partial<type1> = {};

// okay given keyof and lookup types, this should be possible according to
//https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/
const map = <T, J extends Record<string, any>>(obj:T):J =>{
    var result = {}
    for(var key in obj){
        
    }




    return result as J;
}


