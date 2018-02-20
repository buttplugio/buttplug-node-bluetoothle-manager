# Buttplug Node BluetoothLE Device Manager

[![npm](https://img.shields.io/npm/v/buttplug-node-bluetoothle-manager.svg)](https://npmjs.com/package/buttplug-node-bluetoothle-manager) [![Build Status](https://travis-ci.org/qdot/buttplug-node-bluetoothle-manager.svg?branch=master)](https://travis-ci.org/metafetish/buttplug-node-bluetoothle-manager) [![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)

Module for adding Bluetooth LE device capabilities to native Buttplug
Node Servers (using
[buttplug-js](https://github.com/metafetish/buttplug-js)). Uses the
[Noble package](https://github.com/sandeepmistry/noble) for accessing
native Bluetooth LE APIs.

## Table Of Contents

- [Support The Project](#support-the-project)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Usage Example](#usage-example)
- [License](#license)

## Support The Project

If you find this project helpful, you
can
[support Metafetish projects via Patreon](http://patreon.com/qdot)!
Every donation helps us afford more hardware to reverse, document, and
write code for!

## Installation

To install buttplug-js in your node project via npm, a simple add call
should do it.

```
npm add buttplug-node-bluetoothle-manager
```

buttplug-node-bluetoothle-manager is considered a plugin for
buttplug-js, and has that project as a peer dependency. You will need
to add buttplug-js >= 0.4.0 to the project that is using
buttplug-node-bluetoothle-manager in order for this to work correctly.

## API Documentation

buttplug-node-bluetoothle-manager API Documentation is available at
[https://metafetish.github.io/buttplug-node-bluetoothle-manager](https://metafetish.github.io/buttplug-node-bluetoothle-manager).

The documentation is rebuilt on every commit/merge to master.

## Usage Example

This module provides a DeviceManager derived class that can be added
to a Buttplug server. Not that this manager will not work with
browser-based projects, it is only meant for native node projects.
Browser-based projects can use the WebBluetooth manager that comes
as part of buttplug-js.

To add a new BluetoothLE manager:

```javascript
let Buttplug = require('buttplug');
let ButtplugBLEManager = require('buttplug-bluetoothle-manager');
let bs = new Buttplug.ButtplugServer();
bs.AddDeviceManager(new ButtplugBLEManager.ButtplugBluetoothLEDeviceManager());
// ...
```

After the manager has been added, if the server receives a
StartScanning request and has a bluetooth radio that is connected and
on, it will scan for bluetooth devices. The server can find all
devices supported by the version of buttplug-js in your project. See
the [buttplug-js
README](https://github.com/metafetish/buttplug-js#readme) for a list
of supported devices.

## License

BSD 3-Clause licensed

    Copyright (c) 2017, Metafetish
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.
    
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
    
    * Neither the name of the project nor the names of its
      contributors may be used to endorse or promote products derived
      from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
