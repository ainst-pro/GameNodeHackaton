import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Web3NativeService} from "./web3/web3.native.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public web3 : Web3NativeService) {
    this.web3.loadNativeWeb3();
  }

  public map = [];
  public gameData: any = {};
  public gameState: any = 0;


  getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  async getMap() {
    // Данные получаются из контракта
    let rows = 30;
    let cols = 30;
    let _this = this;
    function generateMap(rows, cols) {

      let map = [];
      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          map.push({
            c,
            r,
            value: _this.getRandomFloat(.1,.9),
          });
        }
      }
      return map;
    }

    this.map = generateMap(rows, cols);
  }

  async movePlayer(r, c) {
    // Данные получаются из контракта
    // await this.web3.action(xOffset, yOffset, indexTargetPlayer);

    // this.player.position.c = c;
    // this.player.position.r = r;
    // this.player.energy += 1;
    //
    // let cell = _.find(this.map, (o) => { return o.c === c && o.r === r; });
    // let rnd = this.getRandomFloat(0,1);
    // console.log(rnd);
    // if (rnd <= cell.value) {
    //   this.player.energy += 10;
    // }
  }

  async getPlayer(r, c) {
    // Данные получаются из контракта

  }

  async getOtherPlayers(r, c) {
    // Данные получаются из контракта

  }

  async register() {
    console.log('registerPlayer', await this.web3.Game.methods.registerPlayer().send({from: this.web3.getCurrentAddress()}));
  }

  async start() {
    let state = await this.web3.getState();
    if (state == 1) console.log('startGame', await this.web3.Game.methods.startGame().send({from: this.web3.getCurrentAddress()}));
  }

  async getData() {
    this.gameData = await this.web3.getData();
    this.gameState = await this.web3.getState();
    console.log('getData', this.gameData);
    console.log('State', this.gameState);
  }

}
