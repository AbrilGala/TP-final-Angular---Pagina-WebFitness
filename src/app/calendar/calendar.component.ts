import { Component, OnInit } from '@angular/core';
import { day } from '../models/day';
import { week } from '../models/week';
import { month } from '../models/month';
import { season } from '../models/season';
import { style } from '@angular/animations';
import { routine } from '../models/routine';
import { Display } from '../display/display';
import { Usuario } from '../models/usuario';
import { UserService } from '../user.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
currentDate = new Date();
actualDay: any;
months: Array<month> = [];
routineAdded: boolean = false;
usersList: Usuario[] = [];
user: Usuario = new Usuario("","","");
position: number = -1;
newSeason: season = new season(0, [], 0);
constructor(userService: UserService){
  this.usersList = userService.obtenerUsuarios();
}
ngOnInit(): void {
  const userSerializado = localStorage.getItem("oneUser");
    if(userSerializado){
      this.user = JSON.parse(userSerializado);
    }     

  this.position = this.verificarUsuarioExistente(this.user);  
  if(this.position>=0){    
    if(this.user.newSeason != undefined){
      this.newSeason = this.user.newSeason;
      this.months = this.newSeason.months
    }else{
      console.log("USER WITHOUT CALENDAR");
      this.months = this.createCalendar(); ///ESTO YA NO HACE FALTA, ERA PARA CREARLO, AHORA SE LEE DE LOCAL STORAGE ABAJO
      this.newSeason = new season(this.months.length, this.months, 2024);
      localStorage.setItem("2024", JSON.stringify(this.newSeason));
      this.months = this.newSeason.months;
      for(let i=0; i<this.months.length; i++){
        this.moveDays(this.months[i]);
      }
      this.verifyAddedRoutines();
      this.newSeason.months = this.months;
      this.user.newSeason = this.newSeason;
      localStorage.setItem("oneUser", JSON.stringify(this.user));
      this.usersList[this.position] = this.user;
      localStorage.setItem("users", JSON.stringify(this.usersList));
      localStorage.setItem("2024", JSON.stringify(this.newSeason));
      location.reload();
    }
  }
}
verifyAddedRoutines(){
  let verify = localStorage.getItem("calendarAdded");
  if(verify){
    this.routineAdded = JSON.parse(verify);
    console.log("ROUTINE ADDED BEFORE IF");
    if(this.routineAdded==true){
      console.log("ROUTINE ADDED AFTER IF");
      Display.displayBlock("added");
    }else{
      Display.displayNone("added");
    }
    localStorage.removeItem("calendarAdded");
  }
}
verificarUsuarioExistente(user: Usuario): number{
  let i=0;
  let position = -1;
  console.log(this.usersList.length);
    while(i<this.usersList.length && user.email != this.usersList[i].email){
      console.log(this.usersList[i].email);
      console.log(user.email);
      
      i++;
    }
    if(i<this.usersList.length) {        
      position = i;
    }
    return position;
}
isCurrentDay(dayNumber: number, monthNumber: number): boolean{
  let actualMonth = this.currentDate.getMonth()+1;
  this.actualDay = this.currentDate.getDate();
  if(actualMonth == monthNumber && this.actualDay == dayNumber){
    return true;
  }else{
    return false;
  }
}
moveDays(month: month){
  for(let i=0; i<month.startDayNumb-1; i++){
    let dayAux1 = new day(0, '', 0);
    month.days.unshift(dayAux1);
  }
}
currentDateStyle(month: number, date: number){
  let actualMonth = this.months[month+1];
  this.actualDay = actualMonth.days[date];
}
createCalendar(){
  let months: Array<month> = [];
  let days: Array<day> = [];
  for(let i=1; i<=12; i++){
    switch(i){
      case 1:
        days = this.createDaysAndWeeks(31, 1);
        let january = new month('January', days, 1, days[0].weekDay);
        months.push(january);
        break;
      case 2:
        days = this.createDaysAndWeeks(29, 4);
        let february = new month('February', days, 2,  days[0].weekDay);
        months.push(february);
        break;
      case 3:
        days = this.createDaysAndWeeks(31, 5);
        let march = new month('March', days, 3,  days[0].weekDay);
        months.push(march);
        break;
      case 4:
        days = this.createDaysAndWeeks(30, 1);
        let april = new month('April', days, 4,  days[0].weekDay);
        months.push(april);
        break;
      case 5: 
        days = this.createDaysAndWeeks(31, 3);
        let may = new month('May', days, 5,  days[0].weekDay);
        months.push(may);
        break;
      case 6:
        days = this.createDaysAndWeeks(30, 6);
        let june = new month('June', days, 6,  days[0].weekDay);
        months.push(june);
        break;
      case 7:
        days = this.createDaysAndWeeks(31, 1);
        let july = new month('July', days, 7,  days[0].weekDay);
        months.push(july);
        break;
      case 8:
        days = this.createDaysAndWeeks(31, 4);
        let august = new month('August', days, 8,  days[0].weekDay);
        months.push(august);
        break;
      case 9:
        days = this.createDaysAndWeeks(30, 7);
        let september = new month('September', days, 9,  days[0].weekDay);
        months.push(september);
        break;
      case 10:
        days = this.createDaysAndWeeks(31, 2);
        let october = new month('October', days, 10,  days[0].weekDay);
        months.push(october);
        break;
      case 11:
        days = this.createDaysAndWeeks(30, 5);
        let november = new month('November', days, 11,  days[0].weekDay);
        months.push(november);
        break;
      case 12:
        days = this.createDaysAndWeeks(31, 7);
        let december = new month('December', days, 12,  days[0].weekDay);
        months.push(december);
        break;
    }
  }
  return months;
}
createDaysAndWeeks(daysNumber: number, dayAux: number){
  let weekNumber: number = 1;
  let days: Array<day> = [];
  ///let weeks: Array<week> = [];
  for(let i=1; i<=daysNumber; i++){
    if(dayAux==8){ /// DayAux es el dia de la semana, para guiarse con lunes/martes/miercoles y asi. Si es 8 significa que ya paso el domingo, entonces lo vuelve a 1 y empieza en lunes.
      weekNumber ++;
      dayAux = 1;
    }
    switch(dayAux){
      case 1:
        let monday = new day(i, 'Monday', 1);
        days.push(monday);
        break;
      case 2:
        let tuesday = new day(i, 'Tuesday', 2);
        days.push(tuesday);
        break;
      case 3:
        let wednesday = new day(i, 'Wednesday', 3);
        days.push(wednesday);
        break;
      case 4:
        let thursday = new day(i, 'Thursday', 4);
        days.push(thursday);
        break;
      case 5:
        let friday = new day(i, 'Friday', 5);
        days.push(friday);
        break;
      case 6:
        let saturday = new day(i, 'Saturday', 6);
        days.push(saturday);
        break;
      case 7:
        let sunday = new day(i, 'Sunday', 7);
        days.push(sunday);
        break;
    }
    dayAux++;
  }
  return days;
}
changeWindow(name: string, month: month){
  localStorage.setItem("monthSelected", JSON.stringify(month));
  window.location.href = name;
}
}
