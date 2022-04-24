import { NativeMgr } from "../../Helper/NativeMgr";
import { DealEventLog } from "../../HotUpdateDealer/Implement/DealEventLog";
import { DealOtherEvent } from "../../HotUpdateDealer/Implement/DealOtherEvent";
import { Version } from "../../Version";
import { IVersionLoader } from "../Interface/IVersionLoader";

export class VersionLoader implements IVersionLoader
{
    localManifestUrl: string;
    localV: string;
    remoteV: string;
    
    private get assetsMgr(): jsb.AssetsManager
    {
        return NativeMgr.Mgr;
    }
    Load(callback: (local: Version, remote: Version) => void): void
    {
        if (this.canRun())
        {
            NativeMgr.NewMgr(this.localManifestUrl, (vl: string, vr: string) =>
            {
                this.localV = vl;
                this.remoteV = vr;
            });
            this.assetsMgr.setEventCallback((e: jsb.EventAssetsManager) =>
            {
                if (e.getEventCode() == jsb.EventAssetsManager.NEW_VERSION_FOUND)
                {
                    callback(new Version(this.localV), new Version(this.remoteV));
                } else
                {
                    new DealOtherEvent().Deal(e);
                }
                // new DealEventLog("VersionLoader").Deal(e);
            });
            this.assetsMgr.checkUpdate();
        } else
        {
            callback(Version.default, Version.default);
        }
    }    
    canRun():boolean
    {
        return this.isJsbExist() && this.localManifestUrl != undefined;
    }

    isJsbExist():boolean
    {
        return (<any>window).jsb !== undefined;
    }
}