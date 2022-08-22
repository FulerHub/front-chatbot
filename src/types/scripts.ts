
export function createSound(sound:string) {
    let audio = new Audio();
    audio.src = sound;
    audio.autoplay = true;
}

export function DateToString(x:Date, y:string) {
    let z:any = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v:any) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function(v:any) {
        return x.getFullYear().toString().slice(-v.length)
    });
};
