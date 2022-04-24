import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";

export class DealUpdating implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return code == jsb.EventAssetsManager.UPDATE_PROGRESSION;
    }
    Deal(event: jsb.EventAssetsManager): void
    {
        let percent = event.getPercent();
        let filePercent = event.getPercentByFile();
        let prefile = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
        let prebyte = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
        console.log("percent::"+percent,"filePercent::"+ filePercent,"prefile::"+ prefile,"prebyte::"+ prebyte);
        var msg = event.getMessage();
        if (msg)
        {
            'Updated file: ' + msg;
        }
    }
}