import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UiToolbarService } from 'ng-smn-ui';

@Component({
  selector: 'app-controle-presenca',
  templateUrl: './controle-presenca.component.html',
  styleUrls: ['./controle-presenca.component.scss']
})
export class ControlePresencaComponent implements OnInit, AfterViewInit, OnDestroy {
  menuList;
  itemModel;

  constructor(private toolbarService: UiToolbarService) { 
    this.itemModel = {
      parentId: 'idMae',
      name: 'nome'
  };

  this.menuList = [{}];
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.toolbarService.activateExtendedToolbar(600);
  }

  ngOnDestroy() {
    this.toolbarService.deactivateExtendedToolbar();
  }

}
