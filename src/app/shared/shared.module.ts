import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SpdataService } from './spdata.service';
import { SpAuthService } from './sp-auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [HttpClient, SpdataService, SpAuthService]
})
export class SharedModule { }
