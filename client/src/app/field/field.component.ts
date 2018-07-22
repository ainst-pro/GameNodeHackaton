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

  players: Array<any> = [];

  isPlayerHere(c, r) {
    return (this.players[0].x.toString() === c.toString() && this.players[0].y.toString() === r.toString())
    // return (this.data.players[0].x === x && this.data.players[0].y === y)
  }
  isPlayer2Here(c, r) {
    return (this.players[1].x.toString() === c.toString() && this.players[1].y.toString() === r.toString())
  }
  isPlayer3Here(c, r) {
    return (this.players[2].x.toString() === c.toString() && this.players[2].y.toString() === r.toString())
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
       this.idxCurrentPlayerTurn = (await this.web3.Game.methods.idxCurrentPlayerTurn().call()) * 1;
       this.data = await this.web3.getData();
       this.map = [];
       this.data.field.forEach((x, idx) => {this.map.push({c: idx%30, r: (idx/30).toFixed(0), value: (x*1+10)/100});});
       console.log(this.data);

       this.players = [];
       for (let p of this.data.players) {
         if (p.playerAddress.toLowerCase() === this.web3.getCurrentAddress().toLowerCase()) {
           this.players.unshift(p)
         } else {
           this.players.push(p);
         }
         console.log(this.players[0], this.players[1], this.players[2])
       }
      // clearInterval(this.timer)
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

  async movePlayer(c, r) {

    if (this.isHighlightedCell(c,r))
    {
      const player = this.data.players[this.idxCurrentPlayerTurn];
      const offX = c - player.x;
      const offY = r - player.y;
      alert(offX + ' ' + offY);
      this.web3.Game.methods.action(offX, offY, 0).send({from: this.web3.getCurrentAddress()});
    }
    // await this.mainService.movePlayer(r, c);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  isHighlightedCell(c, r)
  {
    if (this.isMineTurn())
    {
      const player = this.data.players[this.idxCurrentPlayerTurn];
      const offX = Math.abs(player.x - c);
      const offY = Math.abs(player.y - r);
      return (offX>0 && offX<=3 && offY ==0) || (offY>0 && offY<=3 && offX ==0);
    }
  }

  isMineTurn() {
    return this.data && this.data.players[this.idxCurrentPlayerTurn] && (this.data.players[this.idxCurrentPlayerTurn].playerAddress.toLowerCase() === this.web3.getCurrentAddress().toLowerCase());
  }
}
