const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('oneLeft', {
  platform: process.platform,
});
