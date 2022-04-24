export class NativeMgr
{   
    private static _assetsMgr: jsb.AssetsManager;
    static get Mgr(): jsb.AssetsManager
    {
        return this._assetsMgr;
    }
    static NewMgr(localManifestUrl: string, onDownLoadVersions: (vl: string, vr: string) => void)
    {
        this._assetsMgr = new jsb.AssetsManager("", this.storagePath, (vl: string, vr: string) =>
        {
            onDownLoadVersions(vl, vr);
            return -1;
        });
        this._assetsMgr.loadLocalManifest(localManifestUrl);
    }
    static get storagePath()
    {
        return (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset';
    }
}