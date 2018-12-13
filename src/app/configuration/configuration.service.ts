import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
const { version: appVersion } = require('../../../package.json');
declare function require(moduleName: string): any;
@Injectable()
export class ConfigurationService {

  static dateLocale = 'hr-HR';
  static serviceDatePattern = 'en-EN';
  // SSRS
  static reportingServer = environment.reportingServer;

  //  SSRS naredbe:
  static execute2008 = '&rs:Command=Render';

  // Service messages
  static successInsertTrasnakcija = 'Transakcija uspješno spremljena.';

  appVersion = appVersion;
  server = environment.server;
  messasgeBroker = 'broker';
  notificationChannel = '/topic/notify';
  replyChannel = '/user/queue/reply';

}
