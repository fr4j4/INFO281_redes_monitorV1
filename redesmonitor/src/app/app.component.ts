import { Component } from '@angular/core';
import { DataService } from './services/dataservice';
import { Car } from './models/car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'Car Monitor';
  car_list:Car[]
  dataset=[]
  displayedColumns: string[] = ['id', 'mac', 'linea','acceleration','kmh','rpm','fuellevel','timestamp'];

  constructor(private dataservice:DataService){
  }

  ngOnInit(){
    this.dataservice.getCarList().subscribe((result:any) =>{
      this.car_list = result
      let tmp_arr =[]   
      result.map(
        car=>{
          console.log(car)
          tmp_arr.push({
            id:car.id,
            mac:car.mac,
            linea:car.status.lane,
            acceleration:car.status.acceleration,
            kmh:car.status.kmh,
            rpm:car.status.rpm,
            fuellevel:car.status.fuelLevel,
            timestamp:car.status.timestamp
          })
        }
      )
      this.dataset=tmp_arr
      
    });
  }

}
