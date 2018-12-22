/// <reference types="node" />
import { IDeviceSubtypeManager, ButtplugLogger } from "buttplug";
import { EventEmitter } from "events";
export declare class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {
    private isScanning;
    private initializerPromise;
    private logger;
    constructor();
    Initialize(): Promise<void>;
    StartScanning(): Promise<void>;
    StopScanning(): Promise<void>;
    readonly IsScanning: boolean;
    SetLogger(aLogger: ButtplugLogger): void;
    private OpenDevice;
}
