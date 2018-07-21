import {Component, OnDestroy, OnInit} from '@angular/core';
import {getRandomString} from "selenium-webdriver/safari";
import {MainService} from "app/main.service";
import {Web3NativeService} from "../web3/web3.native.service";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {

  constructor(public mainService: MainService, public web3 : Web3NativeService) {
    this.web3.loadNativeWeb3();
  }

  player: any;
  player2: any;
  player3: any;

  isPlayerHere(c, r) {
    return (this.player.x.toString() === c.toString() && this.player.y.toString() === r.toString())
    // return (this.data.players[0].x === x && this.data.players[0].y === y)
  }
  isPlayer2Here(c, r) {
    return (this.player2.x.toString() === c.toString() && this.player2.y.toString() === r.toString())
  }
  isPlayer3Here(c, r) {
    return (this.player3.x.toString() === c.toString() && this.player3.y.toString() === r.toString())
  }


  timer: any;
  public state: number;
  public idxCurrentPlayerTurn: number;
  public data: any;
  public map = [];

  descs = ['Ожидание игроков...', 'Ожадание начала игры', 'Идёт игра', 'Игра завершена!'];
  getStateDescription()
  {
    return this.descs[this.state];
  }

  async ngOnInit() {
    this.timer = setInterval(async () =>{
       this.state = await this.web3.Game.methods.state().call();
       this.idxCurrentPlayerTurn = await this.web3.Game.methods.idxCurrentPlayerTurn().call();
       this.data = await this.web3.getData();
       this.map = [];
       this.data.field.forEach((x, idx) => {this.map.push({c: idx%30, r: (idx/30).toFixed(0), value: x/100});});
       console.log(this.data);

      this.player = undefined;
      this.player2 = undefined;
      this.player3 = undefined;
       for (let p of this.data.players) {
         if (p.playerAddress.toLowerCase() === this.web3.getCurrentAddress().toLowerCase()) {
           this.player = p;
           this.player.x = (p.x).toFixed(0);
           this.player.y = (p.y).toFixed(0); console.log("!")
         } else {
           if (!this.player2) {
             this.player2 = p;
             this.player2.x = (p.x).toFixed(0);
             this.player2.y = (p.y).toFixed(0);
           } else {
             this.player3 = p;
             this.player3.x = (p.x).toFixed(0);
             this.player3.y = (p.y).toFixed(0);
           }
         }
         console.log(this.player, this.player2, this.player3)
       }

    }, 5000);

    // console.log(this.web3.getCurrentAddress())
    // console.log(await this.web3.getData())
    // console.log('gameBonus', await this.web3.Game.methods.getData().call());
    // console.log('idxCurrentPlayerTurn', await this.web3.Game.methods.idxCurrentPlayerTurn().call());
    // console.log('state', await this.web3.Game.methods.players(0).call());
    // console.log('state', await this.web3.Game.methods.getField().call());


    // console.log('state', await this.web3.Game.methods.registerPlayer().send({from: this.web3.getCurrentAddress()}));
    // console.log('state', await this.web3.Game.methods.startGame().send({from: this.web3.getCurrentAddress()}));
    // for(let i=0 ; i < 900;i++)
    // console.log(`${i}`, await this.web3.Game.methods.field(i).call());
  }

  async movePlayer(r, c) {
    await this.mainService.movePlayer(r, c);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

}
