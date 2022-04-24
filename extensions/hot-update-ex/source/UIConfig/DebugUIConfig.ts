import { debug } from "console";
import { IConfigItem, IDisplayOptions } from "../../@types";

export class DebugUIConfig implements IConfigItem
{
    label: string = "isDebug";
    description: string = "是否打开Debug";
    default: any = false;
    render: {
        ui: "ui-checkbox"
    };
}