/// <reference types="node" />
import { IDeviceSubtypeManager } from "buttplug";
import { EventEmitter } from "events";
export declare class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private isScanning;
    private initializerPromise;
    constructor();
    Initialize(): Promise<void>;
    StartScanning(): Promise<void>;
    StopScanning(): Promise<void>;
    readonly IsScanning: boolean;
    private OpenDevice;
}
