import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { ErrorModule } from './views/error/error.module';
import { MainModule } from './views/main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './views/auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlunoPresencaModule } from './views/aluno-presenca/aluno-presenca.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AlunoPresencaModule,
        ErrorModule,
        MainModule,
        AuthModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
