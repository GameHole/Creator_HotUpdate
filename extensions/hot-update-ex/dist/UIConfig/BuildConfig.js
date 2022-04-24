"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildConfig = void 0;
class BuildConfig {
    constructor() {
        this.hooks = './hooks';
        this.options = {
            remoteAddress: {
                label: 'i18n:xxx',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                }
            }
        };
    }
}
exports.BuildConfig = BuildConfig;
