import { AfterViewInit, Component, OnInit, ElementRef } from '@angular/core';
import {UiElement} from 'ng-smn-ui';
import { ApiService } from '../../../core/api/api.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-aluno-presenca',
    templateUrl: './presenca.component.html',
    styleUrls: ['./presenca.component.scss']
})
export class PresencaComponent implements OnInit, AfterViewInit {
    codigo: number;

    constructor(private element: ElementRef,
                private api: ApiService) {
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

        this.api
            .http('POST', `${environment.AUTH_API}/aluno-presenca/${this.codigo}`)
            .call()
            .subscribe( res => {
                console.log(res.content)
            }, err => {
                console.log(err)
                UiSnackBar.show()
            }, () => {

            })
        

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }
}
