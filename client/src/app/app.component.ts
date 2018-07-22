import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../environments/environment";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get address()
  {
    return environment.GameAddress;
  }

  get gameLink()
  {
    return `${environment.server}?address=${this.address}`;
  }

  constructor(private route: ActivatedRoute) {
    environment.GameAddress = localStorage['address'] || environment.GameAddress;
    this.route.queryParams
      .subscribe(params => {
        if (params.address)
        {
          environment.GameAddress = params.address;
          localStorage['address'] = environment.GameAddress;
        }
      });
  }
}
