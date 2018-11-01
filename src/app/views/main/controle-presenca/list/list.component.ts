import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ApiService} from '../../../../core/api/api.service';
import {UiToolbarService} from 'ng-smn-ui';
import {enterLeaveViewAnimation} from '../../../../core/utils/animations/enter-leave-view.animations';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [
        enterLeaveViewAnimation
    ]
})
export class ListComponent implements OnInit, AfterViewInit {
    list;
    filterOpen: boolean;
    loadingInit: boolean;
    statusList;
    dataInicial;
    dataFinal;
    filtro;
    pagina: number;

    constructor(
        private api: ApiService,
        private toolbar: UiToolbarService
    ) {
        this.filtro = {};
        this.filterOpen = false;
        this.pagina = 1;
    }

    ngOnInit() {
        this.getControlesPresencas();
        this.getStatus();
    }

    ngAfterViewInit() {
        this.toolbar.activateExtendedToolbar(600);
    }

    getControlesPresencas() {
        this.loadingInit = true;
        this.api.prep(
            'administracao',
            'controlePresenca',
            'selecionar'
        ).call({
            pagina: this.pagina,
            ...this.filtro
        })
            .subscribe(
                res => {
                    console.log(this.pagina);
                    console.log(res.content);
                    this.list = res.content;
                }, null,
                () => {
                    this.loadingInit = false;
                });
    }

    getStatus() {
        this.api.prep(
            'administracao',
            'status',
            'selecionarSimples'
        ).call()
            .subscribe(res => {
                    this.statusList = res.content;
                }, null,
                () => {

                }
            );
    }

    /*TODO
    * idTurma: 237
    * unifasystem-api.herokuapp.com/disciplinas?idTurma=237
    * */

}
