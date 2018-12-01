import {Car, CarEvent} from '../models/car.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService{
    private cars:Observable<Car[]>;

    constructor(private db: AngularFireDatabase){
       this.cars =db.list('/dispositivo').valueChanges().pipe(
           map(
               cars=>{
                let new_cars: Car[] = []
                cars.forEach(car => {
                    let tmp_car = new Car(car['carId'])
                    tmp_car.mac=car['carMac'];
                    let car_data = car['data'];
                    if(car_data!=null){
                        tmp_car.status=car_data['status'];
                        let crash_event:CarEvent=new CarEvent();
                        if(car_data['crash']!=null){
                            crash_event.timestamp=car_data['crash']['timestamp']
                            crash_event.eventType ="crash"
                            crash_event.data = {
                                acceleration:car_data['crash']['acceleration'],
                                airBagsActivated:car_data['crash']['airBagsActivated']
                            }
                        }
                        tmp_car.events.push(crash_event)

                        let laneChanged_event:CarEvent=new CarEvent();
                        if(car_data['laneChanged']!=null){
                            laneChanged_event.timestamp=car_data['laneChanged']['timestamp']
                            laneChanged_event.eventType ="laneChanged"
                            laneChanged_event.data = {
                                oldLane:car_data['laneChanged']['oldLane'],
                                newLane:car_data['laneChanged']['newLane']
                            }
                        }
                        tmp_car.events.push(laneChanged_event)

                        let mechanicFailure_event:CarEvent=new CarEvent();
                        if(car_data['mechanicFailure']!=null){
                            mechanicFailure_event.timestamp=car_data['mechanicFailure']['timestamp']
                            mechanicFailure_event.eventType ="mechanicFailure"
                            mechanicFailure_event.data = {
                                failureCode:car_data['mechanicFailure']['failureCode']
                            }
                        }
                        tmp_car.events.push(mechanicFailure_event)
                    }
                    new_cars.push(tmp_car);
                });
                return new_cars
               }
           )
        ) as Observable<Car[]>;
    }
    getCarList():Observable<Car[]>{
        return this.cars;
    }
}