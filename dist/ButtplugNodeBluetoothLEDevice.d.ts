/// <reference types="node" />
import { IBluetoothDeviceImpl, BluetoothDeviceInfo, ButtplugBluetoothDevice } from "buttplug";
import { EventEmitter } from "events";
import * as noble from "noble";
export declare class ButtplugNodeBluetoothLEDevice extends EventEmitter implements IBluetoothDeviceImpl {
    private _deviceInfo;
    private _device;
    static CreateDevice(aDeviceInfo: BluetoothDeviceInfo, aDevice: noble.Peripheral): Promise<ButtplugBluetoothDevice>;
    private _service;
    private _characteristics;
    constructor(_deviceInfo: BluetoothDeviceInfo, _device: noble.Peripheral);
    readonly Name: string;
    Connect: () => Promise<void>;
    OnDisconnect: () => void;
    WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
    ReadValue: (aCharacteristic: string) => Promise<ArrayBuffer | ArrayBufferView>;
}
