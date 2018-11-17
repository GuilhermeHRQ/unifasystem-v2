import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../core/api/api.service';
import {UiElement, UiSnackbar, UiToolbarService} from 'ng-smn-ui';

@Component({
    selector: 'app-controle-presenca-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class ControlePresencaInfoComponent implements OnInit, AfterViewInit, OnDestroy {
    addingNew: boolean;
    info: any;
    turmas: any;
    disciplinas: any;
    status: any[];
    quantidadePresencas: any[];
    loading: boolean;
    alunos;
    presencas;
    @ViewChild('formControle') formControle;

    constructor(
        public router: Router,
        private activedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private api: ApiService,
        private toolbarService: UiToolbarService,
        private element: ElementRef
    ) {
        this.info = {};
        this.turmas = [];
        this.disciplinas = [];
        this.status = [];

        this.quantidadePresencas = [{qtd: 2}, {qtd: 4}];
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
        this.api
            .prep('administracao', 'controlePresenca', 'selecionarPorId')
            .call({id: this.activedRoute.snapshot.params['id']})
            .subscribe(res => {
                this.info = res.content;
                this.alunos = this.info.alunos;
                this.presencas = Array(this.info.quantidadePresencas).fill(false);
            }, err => {
                UiSnackbar.show({
                    text: err.message
                });
            });
    }

    getPresenca() {
        // console.log(this.alunos);
    }


    onSubmit() {
        if (!this.loading) {
            for (const control in this.formControle.controls) {
                if (this.formControle.controls.hasOwnProperty(control)) {
                    this.formControle.controls[control].markAsTouched();
                    this.formControle.controls[control].markAsDirty();
                }
            }

            if (this.formControle.invalid) {
                UiElement.focus(this.element.nativeElement.querySelector('form .ng-invalid'));
                return false;
            }

            this.loading = true;
            if (this.addingNew) {
                this.api
                    .prep('administracao', 'controlePresenca', 'inserir')
                    .call(this.info)
                    .subscribe((res) => {
                        UiSnackbar.show({
                            text: res.content.message
                        });

                        this.router.navigate(['/controle-presenca/', res.content.id]);
                    }, (err) => {
                        UiSnackbar.show({
                            text: err.message
                        });
                    }, () => {
                        this.loading = false;
                    });
            } else {
                this.api
                    .prep('administracao', 'controlePresenca', 'atualizar')
                    .call(this.info)
                    .subscribe((res) => {
                        UiSnackbar.show({
                            text: 'Controle atualizado com sucesso!',
                            center: true
                        });

                        this.router.navigate(['/controle-presenca/']);
                    }, (err) => {
                        UiSnackbar.show({
                            text: err.message
                        });
                    }, () => {
                        this.loading = false;
                    });
            }
        }
    }

    getDisciplina() {
        if (!this.disciplinas.loading) {
            this.disciplinas.loading = true;

            this.api
                .prep(
                    'administracao',
                    'disciplina',
                    'selecionar'
                ).call({idTurma: this.info.idTurma})
                .subscribe(res => {
                        this.disciplinas = res.content;
                        if (this.disciplinas.length === 1) {
                            this.info.idDisciplina = this.disciplinas[0].id;
                            this.info.nomeDisciplina = this.disciplinas[0].nome;
                        }
                    }, null,
                    () => {
                        this.disciplinas.loading = false;
                    }
                );
        }
    }

    getTurma() {
        this.api
            .prep(
                'administracao',
                'turma',
                'selecionar'
            ).call()
            .subscribe(res => {
                    this.turmas = res.content;
                }, null,
                () => {

                }
            );
    }

    getStatus() {
        this.api
            .prep(
                'administracao',
                'status',
                'selecionarSimples'
            ).call()
            .subscribe(res => {
                    this.status = res.content;
                }
            );
    }

    getSemestre() {
        this.turmas.forEach(item => {
            if (item.id === this.info.idTurma) {
                this.info.semestre = +item.semestre;
                this.info.nomeTurma = item.nome;
            }
        });

        if (this.addingNew) {
            this.info.idDisciplina = null;
            this.getDisciplina();
        }

    }

    getNomeDisciplina() {
        this.disciplinas.forEach(item => {
            if (item.id === this.info.idDisciplina) {
                this.info.nomeDisciplina = item.nome;
            }
        });
    }

    cancelarControle() {
        this.api
            .prep('administracao', 'controlePresenca', 'cancelar')
            .call({id: this.info.id})
            .subscribe(res => {
                UiSnackbar.show({
                    text: res.message
                });
                this.router.navigate(['/controle-presenca']);
            }, err => {
                UiSnackbar.show({
                    text: err.message
                });
            });
    }
}
