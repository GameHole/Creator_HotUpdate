"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const HotFileGenrator_1 = require("./CustomPostProcesser/HotFileGenrator");
const InjectJs_1 = require("./CustomPostProcesser/InjectJs");
const PlatformDecrator_1 = require("./CustomPostProcesser/PlatformDecrator");
var processers = [
    new PlatformDecrator_1.PlatformDecrator(new InjectJs_1.InjectJs()), new PlatformDecrator_1.PlatformDecrator(new HotFileGenrator_1.HotFileGenrator())
];
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("aa",resourcesPath);
    });
};
exports.load = load;
const onBeforeBuild = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.warn("- onBeforeBuild")
    });
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.warn("- onBeforeCompressSettings")
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.warn("- onAfterCompressSettings")
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.warn("- onAfterBuild",Editor.Project.path);
        let project = Editor.Project.path;
        let buildPath = result.dest;
        processers.forEach(v => v.Run(project, buildPath, options));
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("- unload")
    });
};
exports.unload = unload;
