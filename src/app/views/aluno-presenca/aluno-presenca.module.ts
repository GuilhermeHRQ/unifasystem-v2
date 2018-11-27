import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import { PresencaModule } from './presenca/presenca.module';

@NgModule({
    imports: [
        SharedModule,
        PresencaModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class AlunoPresencaModule {
}
