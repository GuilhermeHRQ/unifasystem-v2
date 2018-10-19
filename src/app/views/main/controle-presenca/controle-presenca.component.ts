import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UiToolbarService } from 'ng-smn-ui';

@Component({
  selector: 'app-controle-presenca',
  templateUrl: './controle-presenca.component.html',
  styleUrls: ['./controle-presenca.component.scss']
})
export class ControlePresencaComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private toolbarService: UiToolbarService) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.toolbarService.activateExtendedToolbar(840);
  }

  ngOnDestroy() {
    this.toolbarService.deactivateExtendedToolbar();
  }

}
