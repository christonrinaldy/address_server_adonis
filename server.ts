/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import { curly } from 'node-libcurl'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname)
  .httpServer()
  .start()
  .then(async () => {
    var { data } = await curly.get("https://kasirpintar.co.id/allAddress.txt");
    data = await JSON.parse(data);
    const Redis = require('@ioc:Adonis/Addons/Redis')
    await Redis.set('location', JSON.stringify(data));
  })
