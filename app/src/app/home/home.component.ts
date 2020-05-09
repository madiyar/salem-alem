import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gridStyle = {
    width: '33.33333333%',
    textAlign: 'center',
    fontSize: '20px',
    padding: '40px'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
