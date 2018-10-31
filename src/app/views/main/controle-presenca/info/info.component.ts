import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  names;
  
  constructor() {
    this.names = [
      {id: 1, nome: 'Donatello'},
      {id: 2, nome: 'Leonardo'},
      {id: 3, nome: 'Michelangelo'},
      {id: 4, nome: 'Rafael'},
      {id: 5, nome: 'Mario'},
      {id: 6, nome: 'Ítalo'},
  ];
   }

  ngOnInit() {
  }

}
