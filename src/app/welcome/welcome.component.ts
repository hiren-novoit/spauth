import { Component, OnInit } from '@angular/core';

import { SpAuthService } from './../shared/sp-auth.service';
import { SpdataService } from './../shared/spdata.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _spDataService: SpdataService,
            private _spAuthService: SpAuthService) { }

  ngOnInit() {
    this._spDataService.getLocations()
                        .then((data) => console.log(data))
                        .catch(error => console.log(error)) ;
  }
}
