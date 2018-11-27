import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PresencaComponent } from './presenca.component';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PresencaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PresencaModule { }
