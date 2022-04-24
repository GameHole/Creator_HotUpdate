import { IVersionExcuter } from "../Interface/IVersionExcuter";

export class RunGame implements IVersionExcuter
{
    Excute(): void
    {
        console.log("rungame");
    }    
}