import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpParameterCodec } from '@angular/common/http';
// import { getAuth, IOnlineAddinCredentials, IAuthResponse } from 'node-sp-auth';

@Injectable()
export class SpdataService {

  constructor(private _http: HttpClient) { }

  init() {
    
  }
}
