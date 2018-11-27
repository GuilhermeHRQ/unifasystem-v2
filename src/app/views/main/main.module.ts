import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { UserService } from '../../core/utils/user/user.service';
import { StorageService } from '../../core/utils/storage.service';
import { ControlePresencaModule } from './controle-presenca/controle-presenca.module';

@NgModule({
    imports: [
        SharedModule,
        HomeModule,
        ControlePresencaModule
    ],
    exports: [],
    declarations: [MainComponent],
    providers: [UserService, StorageService]
})
export class MainModule {
}
