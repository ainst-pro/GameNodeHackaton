import { Component, OnInit } from '@angular/core';
import {getRandomString} from "selenium-webdriver/safari";
import {MainService} from "app/main.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(public requestService: MainService) { }

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
  }

  async movePlayer(r, c) {
    await this.requestService.movePlayer(r, c);
  }

}
