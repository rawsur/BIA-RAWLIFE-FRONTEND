import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private readonly CONFIGURATION_URL = "./assets/config/app-settings.json";

  constructor( private http:HttpClient ) { }

  loadAppConfig() {
    return this.http.get(this.CONFIGURATION_URL)
      .toPromise()
      .then((configuration: any) => {
        this.appConfig = configuration;
        console.log("Configuration Loaded : " + this.appConfig.apiBaseUrl );
        return configuration;
      })
      .catch((error) => {
        console.error("Error in loadAppConfig() : " + error);
      });
  }

  getConfiguration() {
    return this.appConfig;
  }

  get apiBaseUrl() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiBaseUrl;
  }

  get appOwner() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.appOwner;
  } //appName

  get appName() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.appName;
  }

  get logo() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.logo;
  }


  get ownerAddress() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.ownerAddress;
  }


  get ownerPhone() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.ownerPhone;
  }

  get version() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    return this.appConfig.version;
  }

}
