import { DeviceAdded, IDeviceSubtypeManager, BluetoothDevices, BluetoothDeviceInfo } from "buttplug";
import { EventEmitter } from "events";
import * as noble from "noble";
import { ButtplugNodeBluetoothLEDevice } from "./ButtplugNodeBluetoothLEDevice";

export class ButtplugNodeBluetoothLEDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private isScanning: boolean = false;

  constructor() {
    super();
    noble.on("stateChange", function(state) {
      if (state === "poweredOn") {
        console.log("bluetooth on!");
      } else {
        console.log("bluetooth off!");
      }
    });
    noble.on("discover", (d: noble.Peripheral) => {
      this.OpenDevice(d);
    });
  }

  public StartScanning() {
    noble.startScanning();
  }

  public StopScanning() {
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
