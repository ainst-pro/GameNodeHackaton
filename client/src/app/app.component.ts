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

  isWeb3Installed : any;

  constructor(private route: ActivatedRoute) {

    this.isWeb3Installed = !!window['web3'];

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
