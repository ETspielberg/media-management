export class Sushiprovider  {

    constructor(
        public identifier: string,
        public name: string,
        public sushiURL: string,
        public sushiRequestorID: string,
        public sushiRequestorName: string,
        public sushiRequestorEmail: string,
        public sushiCustomerReferenceID: string,
        public sushiCustomerReferenceName: string,
        public reportTypes: string[],
        public sushiRelease: number,
        public status: string
    ) { }
}
