#!/usr/bin/env node

'use strict';

let client = require('../init-client');

console.log('Creating scene...');

let scene = new client.scenes.Scene;
scene.name           = 'Huejay test';
scene.lightIds       = [8, 9, 10];
scene.recycle        = false;
scene.transitionTime = 2;
scene.appData        = {version: 1, data: "custom data"};

client.scenes.create(scene)
  .then(scene => {
    console.log(`Scene [${scene.id}] created...`);

    console.log('  Name:', scene.name);
    console.log('  Lights:', scene.lightIds.join(', '));
    console.log('  Owner:', scene.owner);
    console.log('  Recycle:', scene.recycle);
    console.log('  Locked:', scene.locked);
    console.log('  App data:', scene.appData);
    console.log('  Picture:', scene.picture);
    console.log('  Last Updated:', scene.lastUpdated);
    console.log('  Version:', scene.version);
    console.log();

    scene.name = 'New scene name';

    scene.setLightState(10, {
      brightness: 254,
      colorTemp: 300,
    });

    scene.setLightState(9, {
      brightness: 254,
      colorTemp: 250
    });

    return client.scenes.save(scene);
  })
  .then(scene => {
    console.log(`Scene saved...`);

    return client.scenes.delete(scene);
  })
  .then(() => {
    console.log('Scene deleted...');
  })
  .catch(error => {
    console.log(error.stack);
  });
