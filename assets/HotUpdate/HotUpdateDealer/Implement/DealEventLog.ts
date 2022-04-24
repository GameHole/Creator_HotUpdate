import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";

export class DealEventLog implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return true;
    }
    e: string;
    constructor(e="")
    {
        this.e = e;
    }
    readonly bind = [
        { c: jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST, s: "ERROR_NO_LOCAL_MANIFEST" },
        { c: jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST, s: "ERROR_DOWNLOAD_MANIFEST" },
        { c: jsb.EventAssetsManager.ERROR_PARSE_MANIFEST, s: "ERROR_PARSE_MANIFEST" },
        { c: jsb.EventAssetsManager.NEW_VERSION_FOUND, s: "NEW_VERSION_FOUND" },
        { c: jsb.EventAssetsManager.ALREADY_UP_TO_DATE, s: "ALREADY_UP_TO_DATE" },
        { c: jsb.EventAssetsManager.UPDATE_PROGRESSION, s: "UPDATE_PROGRESSION" },
        { c: jsb.EventAssetsManager.ASSET_UPDATED, s: "ASSET_UPDATED" },
        { c: jsb.EventAssetsManager.ERROR_UPDATING, s: "ERROR_UPDATING" },
        { c: jsb.EventAssetsManager.UPDATE_FINISHED, s: "UPDATE_FINISHED" },
        { c: jsb.EventAssetsManager.UPDATE_FAILED, s: "UPDATE_FAILED" },
        { c: jsb.EventAssetsManager.ERROR_DECOMPRESS, s: "ERROR_DECOMPRESS" },
    ]
    Deal(event: jsb.EventAssetsManager): void
    {
        let dd = this.bind.find(b => b.c == event.getEventCode());
        console.log(this.e + "::" + JSON.stringify(dd));
    }    
}