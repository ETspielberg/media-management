import {Component, OnInit} from '@angular/core';
import {ListFilter} from '../model/ListFilter';
import {Router} from '@angular/router';
import {ListfilterService} from '../service/listfilter.service';
import {LineChecker} from '../model/LineChecker';

@Component({
  selector: 'app-listfilter',
  templateUrl: 'list.filter.component.html'
})
export class ListFilterComponent implements OnInit {

  public filterList: ListFilter[];

  public busy: boolean;

  newFilter: string;

  constructor(public router: Router,
              public filterlistService: ListfilterService) {
  }

  ngOnInit() {
    this.busy = true;
    this.filterlistService.listFilters().subscribe(
      value => {
        this.filterList = value;
        console.log(value);
        this.filterlistService.activeListFilter = this.filterList[0];
        this.busy = false;
      }
    );
  }

  createFilter() {
    this.filterlistService.activeListFilter = new ListFilter(this.newFilter,
      '',
      'none',
      'aseq',
      [new LineChecker('append', 'contains', [''], '001', 0)]);
    this.filterlistService.saveActiveListfilter().subscribe(
      () => this.router.navigate(['/listfilter/filter', this.filterlistService.activeListFilter.filter_id]));
  }
}
