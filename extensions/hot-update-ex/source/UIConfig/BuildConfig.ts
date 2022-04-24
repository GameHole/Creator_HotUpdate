import { IBuildPluginConfig, IDisplayOptions } from "../../@types";
import { DebugUIConfig } from "./DebugUIConfig";

export class BuildConfig implements IBuildPluginConfig
{  
    hooks: string = './hooks';
    options: IDisplayOptions = {
        remoteAddress: {
            label: 'i18n:xxx',
            render: {
                ui: 'ui-input',
                attributes: {
                    placeholder: 'Enter remote address...',
                },
            }
        }
    }
}