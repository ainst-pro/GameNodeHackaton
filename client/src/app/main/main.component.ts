import { Component, OnInit } from '@angular/core';
import {Web3NativeService} from "../web3/web3.native.service";
import {MainService} from "../main.service";
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public mainService: MainService, public web3 : Web3NativeService, public router: ActivatedRoute) {
    this.web3.loadNativeWeb3();
  }

  registerLoading = false;
  playerRegistered = false;
  playersReady = false;

  async ngOnInit() {
    this.mainService.player.address = this.web3.getCurrentAddress();

    setInterval(async () => {
      await this.mainService.getData();
      let player = _.find(this.mainService.gameData.players, (o) => {
        return o.playerAddress.toString().toLowerCase() === this.mainService.player.address.toString().toLowerCase();
      });
      console.log(player);
      if (player) {
        this.playerRegistered = true;
      }

      let nullPlayer = _.find(this.mainService.gameData.players, (o) => {
        return o.playerAddress.toString().toLowerCase() === '0x0000000000000000000000000000000000000000';
      });

      if (!nullPlayer) {
        this.playersReady = true;
      }
    }, 2000)

  }

  async register() {
    this.registerLoading = true;
    await this.mainService.register();
  }

  async start() {
    await this.mainService.start();
    this.router.navigate(['/field']);
  }

}
