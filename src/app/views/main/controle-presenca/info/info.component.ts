import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../core/api/api.service';
import {UiToolbarService} from 'ng-smn-ui';

@Component({
    selector: 'app-controle-presenca-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class ControlePresencaInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    addingNew: boolean;
    info: any;
    turmas: any[];
    disciplinas: any[];
    status: any[];

    constructor(
        public router: Router,
        private activedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private api: ApiService,
        private toolbarService: UiToolbarService
    ) {
        this.info = {};
        this.turmas = [];
        this.disciplinas = [];
        this.status = [];
    }

    ngOnInit() {
        if (this.activedRoute.snapshot.params['id']) {
            this.getInfo();
            this.addingNew = false;
        } else {
            this.addingNew = true;
            this.info.idStatus = 1;
        }

        this.changeDetectorRef.detectChanges();

        this.getDisciplina();
        this.getTurma();
        this.getStatus();
    }

    ngAfterViewInit() {
        this.toolbarService.activateExtendedToolbar(840);
    }

    ngOnDestroy() {
        this.toolbarService.deactivateExtendedToolbar();
    }

    getInfo() {
    }

    onSubmit() {
    }

    getDisciplina() {
        /*this.api.prep(
            'administracao',
            'disciplina',
            'selecionar'
        ).call({idTurma: this.info.idTurma})
            .subscribe(res => {
                    this.disciplinas = res.content;
                }, null,
                () => {

                }
            );*/

        this.disciplinas = [
            {id: 1234, nome: 'Produção de Bugs'},
            {id: 4567, nome: 'Filosofia com Piton'},
            {id: 8910, nome: 'Batata'}
        ];
    }

    getTurma() {
        /* this.api.prep(
             'administracao',
             'turma',
             'selecionar'
         ).call()
             .subscribe(res => {
                     this.turmas = res.content;
                 }, null,
                 () => {

                 }
             );*/

        this.turmas = [
            {id: 237, nome: '4º SEM Sistemas de Informação', semestre: 4},
            {id: 310, nome: '4º SEM Engenharia de Software', semestre: 4},
            {id: 123, nome: '2º SEM Batata', semestre: 2}
        ];
    }

    getStatus() {
        this.api.prep(
            'administracao',
            'status',
            'selecionarSimples'
        ).call()
            .subscribe(res => {
                    this.status = res.content;
                }, null,
                () => {

                }
            );
    }

    getSemestre() {
        this.turmas.forEach(item => {
            if(item.id === this.info.idTurma) {
                this.info.semestre = item.semestre;
            }
        });

        this.getDisciplina();
    }
}
