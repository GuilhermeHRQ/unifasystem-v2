import {AfterViewInit, Component, OnInit, ElementRef} from '@angular/core';
import {UiElement, UiSnackbar, UiToolbarService} from 'ng-smn-ui';
import {ApiService} from '../../../core/api/api.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-aluno-presenca',
    templateUrl: './presenca.component.html',
    styleUrls: ['./presenca.component.scss']
})
export class PresencaComponent implements OnInit, AfterViewInit {
    codigo: number;
    loading: boolean;

    constructor(private element: ElementRef,
                private api: ApiService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        UiElement.focus(this.element.nativeElement.querySelector('[name=codigo]'));
    }

    onSubmit(form) {
        if (!this.codigo) {
            UiElement.focus(this.element.nativeElement.querySelector('[name=codigo]'));
            UiSnackbar.show({
                text: 'Insíra seu código do aluno',
                center: true
            });
            return false;
        }

        if (!this.loading) {
            this.loading = true;

            this.api
                .http('POST', `${environment.AUTH_API}/aluno-presenca/${this.codigo}`)
                .call()
                .subscribe(res => {
                    UiSnackbar.show({
                        text: res.content.message,
                        center: true
                    });
                }, err => {
                    UiSnackbar.show({
                        text: 'Códidgo de aluno incorreto ou inválido.',
                        center: true
                    });
                }, () => {
                    this.loading = false;
                    form.reset();
                });
        }
    }

    returnFocus() {
        UiElement.focus(this.element.nativeElement.querySelector('[name=codigo]'));
    }

    bloquearCtrlJ(event) {   // Verificação das Teclas
        setTimeout(() => {
            if (this.codigo != undefined && this.codigo.toString().length) {
                const codigo = this.codigo.toString();
                this.codigo = +codigo.substring(codigo.length - 5);
            }
        }, 1);


        const {keyCode, ctrlKey} = event;
        if (ctrlKey && keyCode === 74) {    //Evita teclar ctrl + j
            return false;
        }
    }
}
