import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SushiproviderService} from '../service/sushiprovider.service';
import {Sushiprovider} from '../model/Sushiprovider';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';

@Component({
    selector: 'app-sushi',
    templateUrl: 'sushi.component.html',
    providers: [SushiproviderService]
})
export class SushiComponent implements OnInit {
  public sushiproviders: Sushiprovider[];

  public selectedSushiprovider: Sushiprovider;

  public showDialog= false;

  public reportTypes = ['JR1', 'BR1', 'BR2', 'PR1'];

  public months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public year: number;

  public selectedMonth: number;

  public currentYear = new Date().getFullYear();

  public reportType: string;

  public  selectedReport: string;

    public busy: boolean;

    constructor(private sushiproviderService: SushiproviderService, private router: Router, private http: HttpClient) {
    }

    ngOnInit(): void {
      this.year = new Date().getFullYear();
      this.reportType = this.reportTypes[0];
      this.selectedMonth = this.months[0];
      this.showDialog = false;
      this.busy = true;
        this.getSushiproviders();
    }

    getSushiproviders() {
        this.sushiproviderService.getAll().subscribe(
            data => {
              this.sushiproviders = data;
              if (this.sushiproviders.length > 0) {
                this.selectedSushiprovider = this.sushiproviders[0];
              }
            }
        );
    }

    deleteSushiprovider(sushiprovider: Sushiprovider): void {
        this.sushiproviderService.deleteSushiprovider(sushiprovider.identifier).subscribe(() => {
            this.sushiproviders = this.sushiproviders.filter(sc => sc !== sushiprovider);
        });
        this.router.navigate(['/media/sushi']);
    }

    collectSushiData(sushiprovider: Sushiprovider): void {
      let url;
      if (this.selectedMonth === 0) {
        url = appGlobals.batchUrl + '/sushi?identifier=' + sushiprovider.identifier + '&mode=month&type='
        + this.selectedReport + '&month=' + this.selectedMonth + '&year=' + this.year;
      } else {
        url = appGlobals.batchUrl + '/sushi?identifier=' + sushiprovider.identifier + '&mode=year&type='
          + this.selectedReport + '&year=' + this.year;
      }
        this.http.get(url).subscribe(res => console.log(res)
        );
    }

    showDialogForSushiprovider(sushiprovider: Sushiprovider) {
      this.selectedSushiprovider = sushiprovider;
      this.showDialog = true;
    }
}
