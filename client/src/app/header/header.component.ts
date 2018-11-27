import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogin: boolean;
  constructor() { }

  ngOnInit() {
    this.isLogin= false;
  }

}
