import { Component, OnInit } from '@angular/core';
import {getRandomString} from "selenium-webdriver/safari";
import {MainService} from "app/main.service";
import {Web3NativeService} from "../web3/web3.native.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(public requestService: MainService, public web3 : Web3NativeService) {
    this.web3.loadNativeWeb3();
  }

  isPlayerHere(c, r) {
    return (this.requestService.player.position.c === c && this.requestService.player.position.r === r)
  }
  isPlayer2Here(c, r) {
    return (this.requestService.player2.position.c === c && this.requestService.player2.position.r === r)
  }
  isPlayer3Here(c, r) {
    return (this.requestService.player3.position.c === c && this.requestService.player3.position.r === r)
  }


  async ngOnInit() {
    await this.requestService.getMap();

    console.log('state', await this.web3.Game.methods.state().call());
    console.log('state', await this.web3.Game.methods.getField().call());
    // for(let i=0 ; i < 900;i++)
    // console.log(`${i}`, await this.web3.Game.methods.field(i).call());
  }

  async movePlayer(r, c) {
    await this.requestService.movePlayer(r, c);
  }

}
