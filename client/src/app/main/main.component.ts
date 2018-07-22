import {Component, OnDestroy, OnInit} from '@angular/core';
import {Web3NativeService} from "../web3/web3.native.service";
import {MainService} from "../main.service";
import {Router} from '@angular/router';
import * as _ from "lodash";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(public mainService: MainService, public web3 : Web3NativeService, public router: Router, private http: HttpClient) {
    this.web3.loadNativeWeb3();
  }

  registerLoading = false;
  playerRegistered = false;
  playersReady = false;

  intervalId: any;

  async ngOnInit() {

    this.intervalId = setInterval(async () => {
      await this.mainService.getData();
      let player = _.find(this.mainService.gameData.players, (o) => {
        return o.playerAddress.toString().toLowerCase() === this.web3.getCurrentAddress().toString().toLowerCase();
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

      if (this.mainService.gameState === '2'){
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 2000)

  }

  async register() {
    this.registerLoading = true;
    await this.mainService.register();
  }

  async start() {
    await this.mainService.start();
    await this.router.navigate(['/field']);
  }

  async newGame() {
    let response = await this.http.get('contract/EnergyWars.sol').toPromise();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}
