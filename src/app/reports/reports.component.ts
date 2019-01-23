import {Component, OnInit} from '@angular/core';
import {TranslateService} from '../translate';
import {ActivatedRoute, Params} from '@angular/router';
import {DataService} from '../service/data.service';
import {Message, SelectItem} from 'primeng/api';
import {Option} from '../model/Option';
import {Dataset} from '../model/Dataset';
import {CounterStats} from '../model/CounterStats';


@Component({
  selector: 'app-reports',
  templateUrl: 'reports.component.html',
  providers: []
})
export class ReportsComponent implements OnInit {

  public counterStats: CounterStats[];

  public yearlyData: CounterStats[];

  private plotData: Map<string, number[][]>;

  public options: Option;

  public showTable = false;

  public statsOptions;

  public yearStats: Map<string, number[][]>;

  public aggregator: string;

  public media: string;

  public identifier: string;

  public messages: Message[];

  public yearStatsLabel: number[];

  public yearStatsValues: number[];

  public cols: any[];

  public colsYears: any[];

  public collected: boolean;

  public tableFields = ['identifier', 'year', 'month', 'requests', 'items'];

  public tableFieldsYears = ['identifier', 'year', 'requests'];

  public mediaOptions: SelectItem[] = [];

  public aggregatorOptions: SelectItem[] = [];

  private availableMedia = ['journal', 'ebook'];

  private availableAggregators = ['publisher', 'platform'];

  public busy: boolean;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.busy = false;
    this.availableAggregators.forEach(entry => this.aggregatorOptions.push(
      {label: this.translateService.instant('aggregator.' + entry), value: entry}));
    this.availableMedia.forEach(entry => this.mediaOptions.push(
      {label: this.translateService.instant('media.' + entry), value: entry}));
    this.collected = false;
    this.cols = [];
    this.messages = [];
    this.plotData = new Map<string, number[][]>();
    this.route.queryParams.subscribe((params: Params) => {
      if (params['identifier'] !== undefined) {
        this.identifier = params['identifier'].trim();
      } else {
        this.identifier = '';
      }
      if (params['aggregator'] !== undefined) {
        this.aggregator = params['aggregator'].trim();
      } else {
        this.aggregator = 'publisher';
      }
      if (params['media'] !== undefined) {
        this.media = params['media'].trim();
      } else {
        this.media = 'journal';
      }
      if (this.identifier !== '') {
        this.getCounterStats();
      }
    });
  }

  public getCounterStats() {
    this.busy = true;
    this.collected = false;
    this.messages = [];
    this.yearStats = new Map();
    this.yearStatsValues = [];
    this.yearStatsLabel = [];
    this.counterStats = [];
    this.plotData = new Map<string, number[][]>();
    this.yearStats = new Map<string, number[][]>();
    this.yearlyData = [];
    this.dataService.getCounterStats(this.identifier, this.aggregator, this.media).subscribe(
      data => {
        if (data.length === 0) {
          this.sendNoDataError();
          this.busy = false;
        } else {
          this.counterStats = data;
          this.counterStats = this.counterStats.sort((n1, n2) => n1.year * 100 + n1.month - n2.month - n2.year);
          this.convertCounterIntoPlotData();
          this.prepareTableFields();
          this.collected = true;
          this.busy = false;
        }
      }
    );

  }

  sendNoDataError() {
    const error = {
      severity: 'error',
      summary: 'Fehler: ',
      detail: this.translateService.instant('message.error.noDataFound')
    };
    this.messages = [];
    this.messages.push(error);
  }

  prepareTableFields() {
    this.cols = [];
    this.colsYears = [];
    this.tableFields.forEach(entry => this.cols.push({
      field: entry,
      header: this.translateService.instant('table.field.' + entry)
    }));
    this.tableFieldsYears.forEach(entry => this.colsYears.push({
      field: entry,
      header: this.translateService.instant('table.field.' + entry)
    }));
  }

  convertCounterIntoPlotData() {
    for (const counterStat of this.counterStats) {
      const year = counterStat.year;
      const date = new Date(year, counterStat.month);
      if (!this.yearStats.has(counterStat.identifier)) {
        this.yearStats.set(counterStat.identifier, []);
      }
      this.yearStats.get(counterStat.identifier).push([new Date(year).valueOf(), counterStat.requests]);
      if (!this.plotData.has('requests.' + counterStat.identifier)) {
        this.plotData.set('requests.' + counterStat.identifier, []);
        this.plotData.set('items.' + counterStat.identifier, []);
      }
      this.plotData.get('requests.' + counterStat.identifier).push([date.valueOf(), counterStat.requests]);
      this.plotData.get('items.' + counterStat.identifier).push([date.valueOf(), counterStat.items]);
    }
    this.updatePlotData();
  }

  updatePlotData() {
    this.statsOptions = new Option({text: this.translateService.instant('usage.per.year')}, [],
      {title: {text: 'Anzahl'}, min: 0, allowDecimals: false},
      {
        type: 'number'
      },
      {defaultSeriesType: 'bar', zoomType: 'xy'},
      ['#AA4643', '#4572A7', '#89A54E', '#80699B',
        '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
    this.statsOptions.exporting = {enabled: true};
    this.statsOptions.tooltip = {xDateFormat: '%Y'};
    this.options = new Option({text: 'Anzahl Zugriffe'}, [],
      {title: {text: 'Anzahl'}, min: 0, allowDecimals: false},
      {
        type: 'datetime',
        dateTimeLabelFormats: {month: '%B %Y'}
      },
      {defaultSeriesType: 'column', zoomType: 'xy'},
      ['#AA4643', '#4572A7', '#89A54E', '#80699B',
        '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
    this.options.lang = {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November',
        'Dezember'],
      shortMonths: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Sep', 'Okt', 'Nov',
        'Dez']
    };
    this.options.plotOptions = {
      column: {
        stacking: 'normal'
      }
    };
    this.statsOptions.plotOptions = {
      series: {
        stacking: 'normal'
      }
    };
    this.options.exporting = {enabled: true};
    this.options.tooltip = {xDateFormat: '%B %Y'};
    this.updateChartObject();
  }

  updateChartObject() {
    this.plotData.forEach(
      (value: number[][], key: string) => {
        value = value.sort((n1, n2) => n1[0] - n2[0]);
        const type = key.substring(0, key.indexOf('.'));
        const name = key.substring(key.indexOf('.') + 1, key.length);
        const dataset = new Dataset(name, value);
        if (type === 'requests') {
          dataset.id = name;
        } else if (type === 'items') {
          dataset.linkedTo = name;
        }
        dataset.stack = type;
        this.options.series.push(dataset);
      }
    );
    this.yearStats.forEach(
      (value: number[][], key: string) => {
        const yearlyData = new Map<number, number>();
        let list: number[][] = [];
        value.forEach((valueInd: number[], index: number) => {
          if (!yearlyData.has(valueInd[0])) {
            yearlyData.set(valueInd[0], 0);
          }
          const newCount = yearlyData.get(valueInd[0]) + valueInd[1];
          yearlyData.set(valueInd[0], newCount);
        });
        yearlyData.forEach((data: number, year: number) => {
          list.push([year, data]);
          this.yearlyData.push(new CounterStats(key, 0, year, data, 0));
        });
        list = list.sort((n1, n2) => n1[0] - n2[0]);
        const dataset = new Dataset(key, list);
        dataset.stack = 'normal';
        this.statsOptions.series.push(dataset);
      });
    console.log(this.statsOptions);
  }
}
