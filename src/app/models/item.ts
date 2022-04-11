export class Item {
    id: string;
    title: string;
    address: any;
    organization:any;
    district:string;
    area:string;
    relation:string;
    schedule: string;
    location: any;

    constructor(){
        this.id = '';
        this.title ='';
        this.district = '';
        this.area ='';
        this.relation = '';
        this.schedule='';
    }
}
