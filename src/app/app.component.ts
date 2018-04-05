import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/primeng';
import {FileWithLink} from './model/FileWithLink';
import {FileService} from './service/file.service';
import {HttpClient} from '@angular/common/http';
import {AuthentificationService} from "./service/authentification.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {


    constructor(private authenticationService: AuthentificationService) {
    }

    ngOnInit(): void {
        // this.principal = this.authentificationService.principal;
    }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        window.location.href = '/lgoin';
      }
    );
  }
}
