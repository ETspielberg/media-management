import {LineChecker} from './LineChecker';

export class ListFilter {

  constructor(
    public filter_id: string,
    public filename: string,
    public record_type: string,
    public format: string,
    public line_checkers: LineChecker[]
  ) {}
}
