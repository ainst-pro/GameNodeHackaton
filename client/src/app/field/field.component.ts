import { Component, OnInit } from '@angular/core';
import {getRandomString} from "selenium-webdriver/safari";
import {MainService} from "app/main.service";
import {Web3NativeService} from "../web3/web3.native.service";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(public mainService: MainService, public web3 : Web3NativeService) {
    this.web3.loadNativeWeb3();
  }

  isPlayerHere(c, r) {
    return (this.mainService.player.position.c === c && this.mainService.player.position.r === r)
  }
  isPlayer2Here(c, r) {
    return (this.mainService.player2.position.c === c && this.mainService.player2.position.r === r)
  }
  isPlayer3Here(c, r) {
    return (this.mainService.player3.position.c === c && this.mainService.player3.position.r === r)
  }


  async ngOnInit() {
    await this.mainService.getMap(); // TODO старый

    console.log(this.web3.getCurrentAddress())
    console.log(await this.web3.getData())
    // console.log('gameBonus', await this.web3.Game.methods.getData().call());
    console.log('idxCurrentPlayerTurn', await this.web3.Game.methods.idxCurrentPlayerTurn().call());
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

}
