import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styles: [],
})
export class EditButtonComponent implements OnInit {

  public row: any;

  constructor() { }

  ngOnInit() {
  }

  click() {
    console.log(this.row);
  }

}
