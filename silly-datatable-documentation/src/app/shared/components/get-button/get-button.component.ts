import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-button',
  templateUrl: './get-button.component.html',
  styleUrls: ['./get-button.component.scss']
})
export class GetButtonComponent implements OnInit {

  public version: string;

  constructor() { }

  ngOnInit() {
    this.version = environment.appVersion;
  }

}
