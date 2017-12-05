import { DeviceAdded, IDeviceSubtypeManager, BluetoothDevices, BluetoothDeviceInfo } from "buttplug";
import { EventEmitter } from "events";
import * as noble from "noble";
import { ButtplugNodeBluetoothLEDevice } from "./ButtplugNodeBluetoothLEDevice";

export class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private isScanning: boolean = false;
  private initializerPromise: Promise<void> | null;

  constructor() {
    super();
    noble.on("discover", (d: noble.Peripheral) => {
      this.OpenDevice(d);
    });
  }

  public async Initialize() {
    let res;
    let rej;
    this.initializerPromise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    noble.on("stateChange", function(state) {
      if (state === "poweredOn") {
        res();
        return;
      }
      rej();
    });
    // TODO Add timeout here in case we don't find or have a radio.
    await this.initializerPromise;
  }

  public async StartScanning() {
    noble.startScanning();
  }

  public async StopScanning() {
    noble.stopScanning();
  }

  public IsScanning(): boolean {
    return false;
  }

  private OpenDevice = async (device: noble.Peripheral): Promise<void> => {
    if (device === undefined) {
      // TODO Throw here?
      return;
    }
    for (const deviceInfo of BluetoothDevices.GetDeviceInfo()) {
      if (deviceInfo.Names.indexOf(device.advertisement.localName) > -1) {
        const bpdevice = await ButtplugNodeBluetoothLEDevice.CreateDevice(deviceInfo, device);
        this.emit("deviceadded", bpdevice);
        return;
      }
    }
  }
}
