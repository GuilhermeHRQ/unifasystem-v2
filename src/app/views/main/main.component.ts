import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UiCookie, UiToolbarService, UiColor } from 'ng-smn-ui';
import { UserService } from '../../core/utils/user/user.service';
import { Router } from '@angular/router';
import {ApiService} from '../../core/api/api.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    title: String;
    menuOpen: boolean;
    menuConfig: any;
    menu: any;
    user: any;

    constructor(
        private titleService: Title,
        private toolbarService: UiToolbarService,
        private router: Router
    ) {
        toolbarService.change.subscribe(title => {
            this.title = title;
        });

        this.menuConfig = {
            id: 'id',
            parentId: 'idmae',
            url: 'url',
            name: 'nome'
        };

        this.menu = UserService.getMenu();
        this.user = UserService.getUser();
    }

    ngOnInit() {
        this.titleService.setTitle('UnifaSystem');
        this.toolbarService.set('');
        this.menuOpen = false;
        this.toolbarService.registerMainToolbar(document.getElementById('app-header'));
        /**
         * Descomentar o código para deixar o menu persistente
         * const isNavDrawerPersistent = UiCookie.get('NavDrawerPersistent') === 'true';
         * if (isNavDrawerPersistent) {
         *      this.menuOpen = true;
         * }
         * */
    }

    ngAfterViewInit() {
    }

    isBright(color) {
        return UiColor.isBright(color);
    }

    logoff() {
        UserService.remove();
        this.router.navigate(['/login']);
    }
}
