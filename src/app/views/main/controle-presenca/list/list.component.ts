import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../../core/api/api.service';
import {UiToolbarService} from 'ng-smn-ui';
import {enterLeaveViewAnimation} from '../../../../core/utils/animations/enter-leave-view.animations';

@Component({
    selector: 'app-controle-presenca-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [
        enterLeaveViewAnimation
    ]
})
export class ControlePresencaListComponent implements OnInit, AfterViewInit {
    list;
    filterOpen: boolean;
    loadingInit: boolean;
    statusList;
    disciplinas;
    turmas;
    dataInicial;
    dataFinal;
    filtro;
    totalLinhas;
    pagina: number;

    constructor(
        private api: ApiService,
        private toolbar: UiToolbarService
    ) {
        this.filtro = {};
        this.filterOpen = false;
        this.loadingInit = false;
        this.pagina = 1;
    }

    ngOnInit() {
        this.getControlesPresencas();
        this.getStatus();
        this.getDisciplina();
        this.getTurma();
    }

    ngAfterViewInit() {
        this.toolbar.activateExtendedToolbar(600);
    }

    verifyDate() {
        this.filtro.dataInicial = this.filtro.dataInicial ? new Date(this.filtro.dataInicial).toLocaleDateString().split('/').reverse().join('-') : undefined;
        this.filtro.dataFinal = this.filtro.dataFinal ? new Date(this.filtro.dataFinal).toLocaleDateString().split('/').reverse().join('-') : undefined;
        this.getControlesPresencas();
    }

    getControlesPresencas() {
        if (!this.loadingInit) {
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
                        this.list = res.content;
                        this.totalLinhas = res.totalLinhas;
                    }, null,
                    () => {
                        this.loadingInit = false;
                    });
        }
    }

    getStatus() {
        this.api.prep(
            'administracao',
            'status',
            'selecionarSimples'
        ).call()
            .subscribe(res => {
                    this.statusList = res.content;
                    this.statusList.unshift({id: null, nome: ''});
                }, null,
                () => {

                }
            );
    }

    getDisciplina() {
        this.api.prep(
            'administracao',
            'disciplina',
            'selecionar'
        ).call()
            .subscribe(res => {
                    this.disciplinas = res.content;
                    this.disciplinas.unshift({id: null, nome: ''});
                }, null,
                () => {

                }
            );
    }

    getTurma() {
        this.api.prep(
            'administracao',
            'turma',
            'selecionar'
        ).call()
            .subscribe(res => {
                    this.turmas = res.content;
                    this.turmas.unshift({id: null, nome: ''});
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
