
export class CarEvent{
    eventType:String
    timestamp:String
    data:{}
}

export class Car{
    id:String
    mac:String
    status:any[]
    events:CarEvent[]=[]
    constructor(id:String){
        this.id=id;
    }
    setMac(new_mac){
        this.mac=new_mac;
    }
    addEvent(event){
        this.events.push(event);
    }
}