import { Component, OnInit } from '@angular/core';
import { SpdataService } from './../shared/spdata.service';
import { SpAuthService } from './../shared/sp-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _spDataService: SpdataService,
            private _spAuthService: SpAuthService) { }

  ngOnInit() {
    this._spAuthService.getAccessToken().then((token: any) => {
      console.log(token);
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
