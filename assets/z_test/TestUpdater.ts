
import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestUpdater
 * DateTime = Sat May 07 2022 15:01:40 GMT+0800 (中国标准时间)
 * Author = qq741419087
 * FileBasename = TestUpdater.ts
 * FileBasenameNoExtension = TestUpdater
 * URL = db://assets/z_test/TestUpdater.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('TestUpdater')
export class TestUpdater extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(Button)
    startBtn: Button;
    @property(Button)
    stopBtn: Button;
    start()
    {
        this.startBtn.node.on("click", () =>
        {
            jsb.reflection.callStaticMethod("com/cocos/game/UpdaterRunner", "StartUpdater", "()V");

        });
        this.stopBtn.node.on("click", () =>
        {
            jsb.reflection.callStaticMethod("com/cocos/game/UpdaterRunner", "StopUpdater", "()V");
        });
        setInterval(() =>
        {
            console.log("TestUpdater");
        }, 500);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
