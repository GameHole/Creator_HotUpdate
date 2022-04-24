"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    // console.log('cocos-build-mpt load');
};
exports.load = load;
const unload = function () {
    // console.log('cocos-build-mpt unload');
};
exports.unload = unload;
exports.configs = {
    'android': {
        hooks: './hooks',
        options: {
            config: {
                label: 'config floader',
                render: {
                    ui: 'ui-file',
                    attributes: {
                        type: "directory",
                        protocols: "project"
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
