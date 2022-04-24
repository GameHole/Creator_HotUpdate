export abstract class IHotUpdateDealer 
{    
    abstract isNeed(code:number): boolean;
    abstract Deal(event: jsb.EventAssetsManager): void;
}