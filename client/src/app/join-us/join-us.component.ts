import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css']
})
export class JoinUsComponent implements OnInit {
  title: string = 'ESPI, 16 Boulevard général de gaulle 44000 Nantes';
  lat: number = 47.2060207;
  lng: number = -1.539401;
  constructor() { }

  ngOnInit() {
  }

}
