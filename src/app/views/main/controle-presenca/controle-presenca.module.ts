import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlePresencaComponent } from './controle-presenca.component';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ControlePresencaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlePresencaModule { }
