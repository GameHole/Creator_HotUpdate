export class Version
{
    static readonly default: Version = new Version("0.0.0.0");
    readonly strVer: string;
    private ver: Array<number> = new Array<number>();
    constructor(strVer: string)
    {
        this.strVer = strVer;
        this.initVer();
    }
    initVer()
    {
        this.strVer.split(".").forEach(v =>
        {
            this.ver.push(Number(v));
        });
    }
    GetVersion(index: number): number
    {
        return this.ver[index] | 0;
    }
}