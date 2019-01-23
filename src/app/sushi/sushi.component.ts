import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SushiproviderService} from '../service/sushiprovider.service';
import {Sushiprovider} from '../model/Sushiprovider';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {CounterLog} from '../model/CounterLog';
import {ConfirmationService, Message, SelectItem} from 'primeng/api';
import {TranslateService} from '../translate';
import {CounterLogSercvice} from '../service/counter.log.sercvice';
import {UUID} from 'angular2-uuid';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-sushi',
  templateUrl: 'sushi.component.html',
  providers: [SushiproviderService]
})
export class SushiComponent implements OnInit {
  public serverUrl = '/api/counterretrieval/comm';

  public sushiproviders: Sushiprovider[];

  public selectedSushiprovider: Sushiprovider;

  public showDialog = false;

  public reportTypes: string[] = ['JR1', 'BR1', 'BR2', 'PR1'];

  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public monthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public reportOptions: SelectItem[];

  public selectedYear: number;

  public selectedMonth: number;

  public sushiprovidersLoaded = false;

  public selectedReport: string;

  public busy: boolean;

  public counterlogs: Map<string, CounterLog>;

  public showCounterLogs: boolean;

  public messages: Message[];

  public counterlogsYears: Set<number>;

  public counterlogsReportTypes: Set<string>;

  public counterlogsMonths: Set<number>;

  public showCounterlog: boolean;

  public selectedCounterlog: CounterLog;

  public activeProfiles: Set<string>;

  private timer: any;

  constructor(private sushiproviderService: SushiproviderService,
              private router: Router,
              private http: HttpClient,
              private confirmationService: ConfirmationService,
              private translateService: TranslateService,
              private counterLogService: CounterLogSercvice) {
  }

  ngOnInit(): void {
    this.activeProfiles = new Set<string>();
    this.selectedYear = new Date().getFullYear();
    this.selectedReport = this.reportTypes[0];
    this.selectedMonth = this.monthOptions[0];
    this.showDialog = false;
    this.busy = true;
    this.getSushiproviders();
    this.counterlogs = new Map<string, CounterLog>();
    this.showCounterLogs = false;
    this.reportOptions = [];
    this.reportTypes.forEach(
      value => this.reportOptions.push({label: this.translateService.instant('report.type.' + value), value: value})
    );
    this.timer = IntervalObservable.create(2000).subscribe(() =>   this.updateRunningSushiproviders());
  }

  getSushiproviders() {
    this.sushiproviderService.getAll().subscribe(
      data => {
        this.sushiproviders = data;
        if (this.sushiproviders.length > 0) {
          this.selectedSushiprovider = this.sushiproviders[0];
        }
        this.sushiprovidersLoaded = true;
      }
    );
  }

  deleteSushiprovider(sushiprovider: Sushiprovider): void {
    this.sushiproviderService.deleteSushiprovider(sushiprovider.identifier).subscribe(() => {
      this.sushiproviders = this.sushiproviders.filter(sc => sc !== sushiprovider);
    });
  }

  collectSushiData(sushiprovider: Sushiprovider): void {
    let url = '';
    console.log(this.selectedMonth);
    console.log((this.selectedMonth !== 0));
    console.log((this.selectedMonth > 0));

    if (this.selectedMonth > 0) {
      console.log('querying per month');
      url = appGlobals.counterUrl + '/sushi?identifier=' + sushiprovider.identifier + '&mode=month&type='
        + this.selectedReport + '&month=' + this.selectedMonth + '&year=' + this.selectedYear;
    } else {
      console.log('querying per year');
      url = appGlobals.counterUrl + '/sushi?identifier=' + sushiprovider.identifier + '&mode=year&type='
        + this.selectedReport + '&year=' + this.selectedYear;
    }
    this.http.get(url).subscribe(res => {
      this.activeProfiles.add(sushiprovider.identifier);
      }
    );
    this.hideCounterLogs();
  }

  saveSushiprovider(): void {
    this.sushiproviderService.create(this.selectedSushiprovider).subscribe(
      data => {
        this.selectedSushiprovider = data;
        this.getSushiproviders();
      });
    this.showDialog = false;
  }

  showDialogForSushiprovider(sushiprovider: Sushiprovider) {
    this.selectedSushiprovider = sushiprovider;
    this.showDialog = true;
  }

  confirmDeletion(sushiprovider: Sushiprovider) {
    this.confirmationService.confirm({
      message: this.translateService.instant('confirm.delete.sushiprovider'),
      accept: () => {
        this.deleteSushiprovider(sushiprovider);
        this.messages = [{severity: 'info', summary: 'Confirmed', detail: 'Sushiprovider deleted'}];
      }
    });
  }

  createNewSushiprovider() {
    const identifier = UUID.UUID();
    this.selectedSushiprovider = new Sushiprovider(identifier, '', '', '', '', '', '', '', [], 4, 'CREATED');
    this.showDialog = true;
  }

  getCounterLogs(sushiprovider: Sushiprovider) {
    this.selectedSushiprovider = sushiprovider;
    this.counterlogs = new Map<string, CounterLog>();
    this.counterlogsMonths = new Set<number>();
    this.counterlogsYears = new Set<number>();
    this.counterlogsReportTypes = new Set<string>();
    this.counterLogService.getCounterLogsForSushiprovider(sushiprovider.identifier).subscribe(
      data => {
        data.forEach(
          entry => {
            if (entry.reportType !== 'undefined') {
              this.counterlogs.set(entry.year + '-' + entry.month + '-' + entry.reportType, entry);
              this.counterlogsMonths.add(entry.month);
              this.counterlogsReportTypes.add(entry.reportType);
              this.counterlogsYears.add(entry.year);
            }
          }
        );
      }
    );
    this.showCounterLogs = true;
  }

  updateRunningSushiproviders() {
    this.activeProfiles = new Set<string>();
    this.sushiproviderService.getRunningSushiproviders().subscribe(
      data => {
        data.forEach(entry => this.activeProfiles.add(entry));
      }
    );
  }

  updateCurrentSushiprovider() {
    this.sushiproviderService.getSushiprovider(this.selectedSushiprovider.identifier).subscribe(
      data => this.selectedSushiprovider = data);
  }

  updateCounterLogs(sushiprovider: Sushiprovider) {
    this.counterLogService.getCounterLogsForSushiprovider(sushiprovider.identifier).subscribe(
      data => {
        data.forEach(
          entry => {
            if (entry.reportType !== 'undefined') {
              this.counterlogs.set(entry.year + '-' + entry.month + '-' + entry.reportType, entry);
              this.counterlogsMonths.add(entry.month);
              this.counterlogsReportTypes.add(entry.reportType);
              this.counterlogsYears.add(entry.year);
            }
          }
        );
      }
    );
    this.showCounterLogs = true;
  }

  getAllCounterStats() {
    const url = appGlobals.counterUrl + '/sushi?identifier=' + this.selectedSushiprovider.identifier + '&aggregator=full&type=&year=';
    this.http.get(url).subscribe(res => console.log(res));
    this.activeProfiles.add(this.selectedSushiprovider.identifier);
    this.showCounterLogs = false;
  }

  showCounterLogDetails(year: number, month: number, type: string) {
    this.selectedCounterlog = this.counterlogs.get(year + '-' + month + '-' + type);
    this.showCounterlog = true;
  }

  hideCounterLogDetails() {
    this.showCounterlog = false;
  }

  hideCounterLogs() {
    this.showCounterLogs = false;
  }

  getStatus(year: number, month: number, type: string) {
    const counterlog = this.counterlogs.get(year + '-' + month + '-' + type);
    if (counterlog) {
      if (counterlog.status === 'SUCCESS') {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'grey';
    }
  }

  isPresent(year: number, month: number, type: string) {
    const counterlog = this.counterlogs.get(year + '-' + month + '-' + type);
    return !!counterlog;
  }


}
