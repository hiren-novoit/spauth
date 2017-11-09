import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpParameterCodec } from '@angular/common/http';
import * as pnp from 'sp-pnp-js';

import { SpAuthService } from './sp-auth.service';
// import { getAuth, IOnlineAddinCredentials, IAuthResponse } from 'node-sp-auth';

@Injectable()
export class SpdataService {
  private static token: string;

  constructor(private _http: HttpClient, private _spAuthService: SpAuthService) { 
    this.init().then((token: string) => {
      console.log(token);
      // pnp.setup({
      //   sp: {
      //       headers: {
      //           "Accept": "application/json; odata=verbose",
      //           "Authorization": token
      //       }
      //   }
      // });
      SpdataService.token = token;
    });
  }

  init() {
    return this._spAuthService.getAccessToken();
  }

  async getLocations(): Promise<any> {
    if (SpdataService.token) {
      let header = new HttpHeaders().append('Authorization', SpdataService.token);
      let locations = await this._http.get('https://wtpaustraliaptyltd.sharepoint.com/sites/intranetpt/api/web/lists/getByTitle("Organisational%20Chart%20Locations")/items', {headers: header}).toPromise();  
      return locations;
    }
    return 'token not found';
    // try {
    //   pnp.setup({
    //     sp: {
    //       headers: {
    //         "Accept": "application/json; odata=verbose",
    //         "Authorization": this.token
    //       }
    //     }
    //   });
    //   let web = new pnp.Web('https://wtpaustraliaptyltd.sharepoint.com/sites/intranetpt');
    //   let locations = web.lists.getByTitle('Organisational Chart Locations').items.get();
  
    //   console.log(locations);
  
    //   return locations;
  
    // } catch(error) {
    //   console.log(error);

    //   throw error;
    // }
  }

}
