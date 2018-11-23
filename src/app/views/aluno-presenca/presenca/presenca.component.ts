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

    onSubmit(form) {
        if (!form.valid) {
            UiElement.focus(this.element.nativeElement.querySelector('form .ng-invalid'));
            UiSnackbar.show({
                text: 'Insíra seu código do aluno',
                center: true
            });
            return false;
        }
        if (this.loading) {
            return false;
        }
        this.loading = true;

        this.api
            .http('POST', `${environment.AUTH_API}/aluno-presenca/${this.codigo}`)
            .call()
            .subscribe(res => {
                UiSnackbar.show({
                    text: res.content.message,
                    center: true
                });
                form.reset();
            }, err => {
                UiSnackbar.show({
                    text: 'Aluno não encontrado.',
                    center: true
                });
            }, () => {
                this.loading = false;
            });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }
}
