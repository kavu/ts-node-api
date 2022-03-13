import 'reflect-metadata';

import { startApp } from './app/startApp';

startApp(3000).then(() => console.log('App started!'));
