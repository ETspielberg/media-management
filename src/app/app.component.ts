import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from './service/authentification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {


    constructor(public authenticationService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.authenticationService.updatePrincipal().subscribe();
    }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        window.location.href = '/login';
      }
    );
  }
}
