import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlePresencaComponent } from './controle-presenca.component';
import { SharedModule } from '../../../shared.module';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { AlunoComponent } from './aluno/aluno.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ControlePresencaComponent, InfoComponent, ListComponent, AlunoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlePresencaModule { }
