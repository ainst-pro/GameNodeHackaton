import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  public map = [];

  public player = {
    position: {
      c: 1,
      r:1,
    },
    energy: 100,
    points: 0,
  };


  public player2 = {
    position: {
      c: 30,
      r:1,
    },
    energy: 100,
    points: 0,
  };

  public player3 = {
    position: {
      c: 1,
      r:30,
    },
    energy: 100,
    points: 0,
  };

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
    this.player.position.c = c;
    this.player.position.r = r;
    this.player.energy += 1;

    let cell = _.find(this.map, (o) => { return o.c === c && o.r === r; });
    let rnd = this.getRandomFloat(0,1);
    console.log(rnd);
    if (rnd <= cell.value) {
      this.player.energy += 10;
    }
  }

  async getPlayer(r, c) {
    // Данные получаются из контракта

  }

  async getOtherPlayers(r, c) {
    // Данные получаются из контракта

  }

}
