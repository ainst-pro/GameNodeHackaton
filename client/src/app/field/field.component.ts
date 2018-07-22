import {Component, OnDestroy, OnInit} from '@angular/core';
import {getRandomString} from "selenium-webdriver/safari";
import {MainService} from "app/main.service";
import {Web3NativeService} from "../web3/web3.native.service";
import {logger} from "codelyzer/util/logger";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import * as _ from "lodash";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {

  constructor(public mainService: MainService, public web3 : Web3NativeService, private route: ActivatedRoute) {
    this.web3.loadNativeWeb3();
    this.route.queryParams
      .subscribe(params => {
        if (params.address)
        {
          environment.GameAddress = params.address;
        }
      });
  }

  get address()
  {
    return environment.GameAddress;
  }

  get gameLink()
  {
    return `${environment.server}?address=${this.address}`;
  }

  players: Array<any> = [];
  player: any = {};
  winner: any = {};

  isPlayerHere(c, r) {
    return (this.players[0].x.toString() === c.toString() && this.players[0].y.toString() === r.toString() && this.players[0].energy > 0)
    // return (this.data.players[0].x === x && this.data.players[0].y === y)
  }
  isPlayer2Here(c, r) {
    return (this.players[1].x.toString() === c.toString() && this.players[1].y.toString() === r.toString() && this.players[1].energy > 0)
  }
  isPlayer3Here(c, r) {
    return (this.players[2].x.toString() === c.toString() && this.players[2].y.toString() === r.toString() && this.players[2].energy > 0)
  }
  isBonusHere(c, r) {
    return (this.data.bonus.x.toString() === c.toString() && this.data.bonus.y.toString() === r.toString())
  }


  timer: any;
  public state: number;
  public target: number = 0;
  public idxCurrentPlayerTurn: number;
  public data: any;
  public map = [];

  descs = ['Waiting for players...', 'Waiting for start the game', 'The game is continue', 'The Game is over!'];
  getStateDescription()
  {
    return this.descs[this.state];
  }

  async ngOnInit() {

    let _this = this;
    async function f() {
      _this.state = await _this.web3.Game.methods.state().call();
      _this.idxCurrentPlayerTurn = (await _this.web3.Game.methods.idxCurrentPlayerTurn().call()) * 1;
      _this.data = await _this.web3.getData();
      _this.map = [];
      _this.data.field.forEach((x, idx) => {
        _this.map.push({c: idx % 30, r: Math.floor(idx / 30), value: (x * 1 + 10) / 100});
      });
      console.log(_this.data);

      _this.players = [];
      for (let p of _this.data.players) {
        if (p.playerAddress.toLowerCase() === _this.web3.getCurrentAddress().toLowerCase()) {
          _this.player = p
        }
        _this.players.push(p);
        console.log(_this.players[0], _this.players[1], _this.players[2]);
      }

      if (_this.state == 3) {
        _this.winner = _.find(_this.players, (o) => {
          return o.energy > 0;
        });
      }
    }

    await f();
    this.timer = setInterval(async () =>{
      f();
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
      // alert(offX + ' ' + offY);
      this.web3.Game.methods.action(offX, offY, this.target).send({from: this.web3.getCurrentAddress()});
    }
    // await this.mainService.movePlayer(r, c);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  tipForPlayer: string = '';

  energySteps = [0, 7, 18, 33, 75, 90];
  generateTipOnHover(c, r)
  {
    this.tipForPlayer = '';
    if (this.isMineTurn())
    {
      const offX = Math.abs(this.player.x - c);
      const offY = Math.abs(this.player.y - r);

      const persent = this.energySteps[Math.max(offX, offY)-1];
      if (persent)
      {
        this.tipForPlayer = `Тратится энергии ${persent}% за ход (${this.data.players[this.idxCurrentPlayerTurn].energy * persent / 100} энергии)`;
      }

    }
  }

  isHighlightedCell(c, r)
  {
    if (this.isMineTurn())
    {
      // const player = this.data.players[this.idxCurrentPlayerTurn];
      const offX = Math.abs(this.player.x - c);
      const offY = Math.abs(this.player.y - r);
      // return (offX>0 && offX<=3 && offY ==0) || (offY>0 && offY<=3 && offX ==0);
      return (offX>=0 && offX<=5) && (offY>=0 && offY<=5);
    }
  }

  isMineTurn() {
    return this.data && this.data.players[this.idxCurrentPlayerTurn] && (this.data.players[this.idxCurrentPlayerTurn].playerAddress.toLowerCase() === this.web3.getCurrentAddress().toLowerCase());
  }

  setTarget(id) {
    this.target = id;
    console.log(this.target);
  }
}
