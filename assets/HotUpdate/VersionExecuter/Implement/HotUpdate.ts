import { VersionLoader } from "../../VersionLoader/Implement/VersionLoader";
import { IHotUpdateDealer } from "../../HotUpdateDealer/Interface/IHotUpdateDealer";
import { IVersionExcuter } from "../Interface/IVersionExcuter";
import { DealSuccess } from "../../HotUpdateDealer/Implement/DealSuccess";
import { DealUpdating } from "../../HotUpdateDealer/Implement/DealUpdating";
import { DealFaild } from "../../HotUpdateDealer/Implement/DealFaild";
import { DealEventLog } from "../../HotUpdateDealer/Implement/DealEventLog";
import { DealUpdated } from "../../HotUpdateDealer/Implement/DealUpdated";
import { NativeMgr } from "../../Helper/NativeMgr";

export class HotUpdate implements IVersionExcuter
{
    eventDealers: Array<IHotUpdateDealer> = [
        new DealSuccess(),
        new DealUpdating(),
        new DealFaild(),
        // new DealOther(),
        new DealUpdated()
    ];
    Excute(): void
    {
        console.log("HotUpdate");
        NativeMgr.Mgr.setEventCallback(this.onUpdate.bind(this));
        NativeMgr.Mgr.update();
    }    
    onUpdate(event: jsb.EventAssetsManager):void
    {
        let code = event.getEventCode();
        for (let i = 0; i < this.eventDealers.length; i++)
        {
            let dealer = this.eventDealers[i];
            if (dealer.isNeed(code))
            {
                dealer.Deal(event);
            }
        }
    }
}