import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpParameterCodec, HttpResponseBase } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

export interface SpAuthSettings {
    clientAppId: string;
    clientAppSecret: string;
    spSiteUrl: string;
    realm?: string;
    authUrl?: string;
    principalName?: string;
}

export interface SpAuthRequestData {
    grant_type: string;
    client_id: string;
    client_secret: string;
    resource: string;
}

export interface SpAuthResponseBody {
    token_type: string;
    expires_in: string;
    not_before: string;
    expires_on: string;
    resource: string;
    access_token: string;
}
  
class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}

export class SpAuthRequest {
    private requestData: SpAuthRequestData; 
    constructor(private authSettings: SpAuthSettings, private _http: HttpClient) {
        this.authSettings.principalName = '00000003-0000-0ff1-ce00-000000000000';
    }

    async init() {
        this.authSettings.realm  = await this.getRealm();
        this.authSettings.authUrl = await this.getLoginUrl();
        
        let url = document.createElement('a');
        url.href = this.authSettings.authUrl;
        let hostname = url.hostname.split('.')[0];

        this.requestData = {
            "client_id": `${this.authSettings.clientAppId}@${this.authSettings.realm}`,
            "client_secret": this.authSettings.clientAppSecret,
            "grant_type": "client_credentials",
            "resource": `${this.authSettings.principalName}/${hostname}@${this.authSettings.realm}`
        };

        return {
            body: this.body,
            authUrl: this.authUrl
        }
    }

    get body(): HttpParams {
      let b = new HttpParams({encoder: new CustomEncoder()});
      Object.keys(this.requestData).forEach((key: string) => {
        b = b.append(key, this.requestData[key]);
      });
      return b;
    }

    get authUrl(): string {
        return this.authSettings.authUrl;
    }

    private async getLoginUrl(): Promise<string> {
        if (this.authSettings.authUrl) {
            return this.authSettings.authUrl;
        } else {
            try {
                let url = `https://accounts.accesscontrol.windows.net/metadata/json/1?realm=${this.authSettings.realm}`;
                console.log(url);
                let res = await this._http.get(url).toPromise();
                let authUrl: string;
                res['endpoints'].forEach((endpoint:any) => {
                    if (endpoint.protocol === 'OAuth2') {
                        authUrl = endpoint.location;
                    }
                });
                return authUrl;
            } catch(error) {
                throw error;
            }
        }
    }

    private async getRealm(): Promise<string> {
        if (this.authSettings.realm) {
            return this.authSettings.realm;
        } else {
            try
            {
                let res = await this._http
                            .post(this.authSettings.spSiteUrl+'/vti_bin/clinent.svc', 
                                { }, 
                                {headers: new HttpHeaders().set('Authorization', 'Bearer')})
                            .toPromise();
                return '';
            } catch (error) {                
                let res = <HttpResponseBase>error;
                let wwwAuth = res.headers.get('WWW-Authenticate');
                let index: number = wwwAuth.indexOf('Bearer realm="');
                let realm = wwwAuth.substring(index + 14, index + 50);
                return realm;
            }
        }
    }
}
