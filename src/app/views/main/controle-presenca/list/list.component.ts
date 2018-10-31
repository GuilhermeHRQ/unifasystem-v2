import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { UiToolbarService } from 'ng-smn-ui';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  list;
  constructor(
    private api: ApiService,
    private toolbar: UiToolbarService
  ) {

  }

  ngOnInit() {
    this.getPresencas();
  }

  ngAfterViewInit() {
    this.toolbar.activateExtendedToolbar(600)
  }

  getPresencas() {
    this.api.prep(
      'administracao',
      'controlePresenca',
      'selecionar'
    ).call()
      .subscribe(
        res => {
          console.log(res)
          this.list = res.content;
        }, err => {
          console.log(err)
        })
  }

}
