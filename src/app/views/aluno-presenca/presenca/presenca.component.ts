import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import {UiElement, UiSnackbar, UiToolbarService} from 'ng-smn-ui';
import { ApiService } from '../../../core/api/api.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-aluno-presenca',
    templateUrl: './presenca.component.html',
    styleUrls: ['./presenca.component.scss']
})
export class PresencaComponent implements OnInit, AfterViewInit {
    codigo: number;
    loading: boolean;

    constructor(private element: ElementRef,
                private api: ApiService,
                private toolbar: UiToolbarService) {
    }

    onSubmit(form) {
        for (const control in form.controls) {
            if (form.controls.hasOwnProperty(control)) {
                form.controls[control].markAsTouched();
                form.controls[control].markAsDirty();
                console.log('entrou')
            }
        }
        if (!form.valid) {
            UiElement.focus(this.element.nativeElement.querySelector('form .ng-invalid'));
            return false;
        }
        if(this.loading){
            return false;
        }
        this.loading = true;

        this.api
            .http('POST', `${environment.AUTH_API}/aluno-presenca/${this.codigo}`)
            .call()
            .subscribe( res => {
                console.log(res.content)
                UiSnackbar.show({
                    text: res.content.message,
                    center: true
                });
            }, err => {
                UiSnackbar.show({
                    text: err.message,
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
