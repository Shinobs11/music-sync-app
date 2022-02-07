

export function test(item: any) {
    var res;

    if (typeof item === 'object') {
        if(item instanceof Array){
            res = typeof item;
        }
        else{
            res = {} as typeof item;
            for (let key in item) {
                res[key] = test(item[key])
            }
        } 
    }
    else {
        return typeof item;
    }
    return res
}