import { IBluetoothDeviceImpl, BluetoothDeviceInfo, ButtplugBluetoothDevice } from "buttplug";
import { EventEmitter } from "events";
let noble;
try {
  noble = require("noble-uwp");
} catch (e) {
  noble = require("noble");
}
import * as util from "util";

export class ButtplugNodeBluetoothLEDevice extends EventEmitter implements IBluetoothDeviceImpl {

  public static async CreateDevice(aDeviceInfo: BluetoothDeviceInfo,
                                   aDevice: any):
  Promise<ButtplugBluetoothDevice> {
    const deviceImpl = new ButtplugNodeBluetoothLEDevice(aDeviceInfo, aDevice);
    await deviceImpl.Connect();
    const device = await aDeviceInfo.Create(deviceImpl);
    // Use a fat arrow closure here, as we need to close over this definition of device.
    deviceImpl.addListener("deviceremoved", () => {
      device.OnDisconnect();
    });
    return device;
  }

  private _service: any;
  private _characteristics: Map<string, any> =
    new Map<string, any>();

  public constructor(private _deviceInfo: BluetoothDeviceInfo,
                     private _device: any) {
    super();
  }

  public get Name(): string {
    return this._device.advertisement.localName!;
  }

  public get Id(): string {
    return this._device.id;
  }

  public Connect = async (): Promise<void> => {
    const connectAsync = util.promisify(this._device.connect.bind(this._device));
    await connectAsync();
    const discoverServicesAsync = util.promisify(this._device.discoverServices.bind(this._device));
    // God damnit noble why can't you just take a normal formatted UUID like
    // everyone else.
    let nobleServices = this._deviceInfo.Services;
    nobleServices = nobleServices.map((x) => x.replace(/-/g, ""));
    this._service = (await discoverServicesAsync(nobleServices))[0];
    const discoverCharsAsync = util.promisify(this._service.discoverCharacteristics.bind(this._service));

    for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
      const nobleChr = this._deviceInfo.Characteristics[name].replace(/-/g, "");
      this._characteristics.set(name,
                                (await discoverCharsAsync([nobleChr]))[0]);
    }
  }

  public OnDisconnect = () => {
    this._device.disconnect();
    this.emit("deviceremoved");
  }

  public WriteValue = async (aCharacteristic: string, aValue: Uint8Array): Promise<void> => {
    if (!this._characteristics.has(aCharacteristic)) {
      return;
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    const buffer = new Buffer( aValue );
    return await util.promisify(chr.write.bind(chr))(buffer, false);
  }

  public ReadValue = async (aCharacteristic: string): Promise<BufferSource> => {
    if (!this._characteristics.has(aCharacteristic)) {
      throw new Error("Tried to access wrong characteristic!");
    }
    const chr = this._characteristics.get(aCharacteristic)!;
    return await util.promisify(chr.read.bind(chr))();
  }

  public WriteString = (aCharacteristic: string, aValue: string): Promise<void> => {
    return Promise.resolve();
  }

  public ReadString = (aCharacteristic: string): Promise<string> => {
    return Promise.resolve("");
  }

  public Subscribe = (aCharacteristic: string): Promise<void> => {
    return Promise.resolve();
  }

  public Disconnect = (): Promise<void> => {
    return Promise.resolve();
  }
p}
