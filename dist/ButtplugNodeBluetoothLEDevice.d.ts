/// <reference types="node" />
import { IBluetoothDeviceImpl, BluetoothDeviceInfo, ButtplugBluetoothDevice } from "buttplug";
import { EventEmitter } from "events";
export declare class ButtplugNodeBluetoothLEDevice extends EventEmitter implements IBluetoothDeviceImpl {
    private _deviceInfo;
    private _device;
    static CreateDevice(aDeviceInfo: BluetoothDeviceInfo, aDevice: any): Promise<ButtplugBluetoothDevice>;
    private _service;
    private _characteristics;
    private _decoder;
    private _notificationHandlers;
    constructor(_deviceInfo: BluetoothDeviceInfo, _device: any);
    readonly Name: string;
    readonly Id: string;
    Connect: () => Promise<void>;
    OnDisconnect: () => void;
    WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
    ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
    WriteString: (aCharacteristic: string, aValue: string) => Promise<void>;
    ReadString: (aCharacteristic: string) => Promise<string>;
    Subscribe: (aCharacteristic: string) => Promise<void>;
    Disconnect: () => Promise<void>;
    protected CharacteristicValueChanged: (aCharName: string, aIsNotification: boolean) => Promise<void>;
}
