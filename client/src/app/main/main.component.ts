import {Component, OnDestroy, OnInit} from '@angular/core';
import {Web3NativeService} from "../web3/web3.native.service";
import {MainService} from "../main.service";
import {Router} from '@angular/router';
import * as _ from "lodash";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(public mainService: MainService, public web3 : Web3NativeService, public router: Router) {
    this.web3.loadNativeWeb3();
  }

  registerLoading = false;
  playerRegistered = false;
  playersReady = false;

  intervalId: any;
  amountPlayersReady: number;

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

      this.amountPlayersReady = 3 - _.filter(this.mainService.gameData.players, (o) => {
        return o.playerAddress.toString().toLowerCase() === '0x0000000000000000000000000000000000000000';
      }).length;

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

  waitingForNewGame: boolean;
  newGameAddress: string;

  get gameAddress()
  {
    return environment.GameAddress;
  }

  get gameLink()
  {
    return `${environment.server}?address=${environment.GameAddress}`;
  }

  async newGame() {
    this.waitingForNewGame = true;
    let game: any = await this.web3.newGame();
    console.log('NEW GAME', game);
    this.waitingForNewGame = false;

    if (game.address)
    {
      this.newGameAddress = game.address;
      environment.GameAddress = game.address;
      localStorage['address'] = environment.GameAddress;

      this.web3.recreateContract();
      // await this.router.navigate(['/field?address=' + game.address]);
    }
    else {
      alert('При создании новой игры произошла ошибка. Попробуйте повторить попытку.');
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}
