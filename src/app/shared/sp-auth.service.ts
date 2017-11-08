import { Injectable } from '@angular/core';
import { SpAuthRequestData, SpAuthResponseBody, SpAuthRequest, SpAuthSettings } from './sp-auth-request'
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpParameterCodec } from '@angular/common/http';


@Injectable()
export class SpAuthService {
  private authSettings: SpAuthSettings = {
    clientAppId: '',
    clientAppSecret: '',
    spSiteUrl: ''
  };

  private _accessToken: string;

  constructor(private _http: HttpClient) { 
  }

  async getAccessToken(): Promise<string> {
    try{
      console.log('getAccessToken works.');
      if (this._accessToken) {
        return this._accessToken;
      }

      let response = await this.generateAuthResponse();

      return `${response.token_type} ${response.access_token}`;
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  private async generateAuthResponse(): Promise<SpAuthResponseBody> {
    let req = new SpAuthRequest({
      clientAppId: "06a99c43-4318-407a-b485-c1ace4e597e2",
      clientAppSecret: "RkJgvKnSBJLs3K4KPlr5B5/tPQF2g/FbHJhvDW+h8MA=",
      spSiteUrl: "https://wtpaustraliaptyltd.sharepoint.com/sites/intranetpt"
    }, this._http);
    
    let data = await req.init();
    let response = await this._http.post<SpAuthResponseBody>(data.authUrl, data.body).toPromise();

    return response;
  }
}
