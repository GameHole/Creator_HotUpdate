"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformDecrator = void 0;
class PlatformDecrator {
    constructor(v) {
        this.v = v;
    }
    Run(projectPath, buildPath, options) {
        if (this.isVailedPlatform(options)) {
            this.v.Run(projectPath, buildPath, options);
        }
    }
    isVailedPlatform(op) {
        return op.platform == "android";
    }
}
exports.PlatformDecrator = PlatformDecrator;
