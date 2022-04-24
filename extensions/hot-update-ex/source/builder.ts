import FTP  from "ftp-ts"
import { resourcesPath } from 'process';
import { BuildPlugin } from '../@types';
import { BuildConfig } from './UIConfig/BuildConfig';

export const load: BuildPlugin.load = function() {
    // console.log('cocos-build-mpt load');
};

export const unload: BuildPlugin.load = function() {
    // console.log('cocos-build-mpt unload');
};

export const configs: BuildPlugin.Configs =
{
    'android': {
        hooks:'./hooks',
        options: {
            config: {
                label: 'config floader',
                render: {
                    ui: 'ui-file',
                    attributes: {
                        type: "directory",
                        protocols:"project"
                    }
                }
            },
            autoIncreaseBuild: {
                label: 'Auto Increase Build Version',
                render: {
                    ui: 'ui-checkbox'
                }
            }
        }
    },
};
