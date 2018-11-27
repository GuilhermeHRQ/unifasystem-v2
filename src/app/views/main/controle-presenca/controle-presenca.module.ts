import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlePresencaComponent } from './controle-presenca.component';
import { SharedModule } from '../../../shared.module';
import { ControlePresencaInfoComponent } from './info/info.component';
import { ControlePresencaListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ControlePresencaComponent, ControlePresencaInfoComponent, ControlePresencaListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlePresencaModule { }
