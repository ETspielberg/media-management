export class LineChecker {

  constructor(
    public mode: string,
    public method_name: string,
    public checklist: string[],
    public field: string,
    public position: number
  ) {}
}
