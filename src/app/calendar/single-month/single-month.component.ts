import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { count, first } from 'rxjs';
import { Display } from 'src/app/display/display';
import { SearchBarComponent } from 'src/app/excercises/search-bar/search-bar.component';
import { day } from 'src/app/models/day';
import { month } from 'src/app/models/month';
import { routine } from 'src/app/models/routine';
import { routineScheduled } from 'src/app/models/routineScheduled';
import { season } from 'src/app/models/season';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.css']
})
export class SingleMonthComponent implements OnInit {
  monthSelected: month = new month('', [], 0, 0);
  months: Array<month> = [];
  season: season = new season(0, [], 0);
  currentDate = new Date();
  actualDay: any;
  addButtonDisplayed: boolean = false;
  selectedDay: any;
  routinesXcalendar: Array<routineScheduled> = [];
  dayOccuped: boolean = false;
  sameMonth: boolean = false;
  usersList: Usuario[] = [];
  user: Usuario = new Usuario("","","");
  newSeason: season = new season(0, [], 0);
  position: number = -1;
  constructor(userService: UserService){
    this.usersList = userService.obtenerUsuarios();
  }
  ngOnInit(): void {
    ///localStorage.removeItem("routinesScheduled");
    const userSerializado = localStorage.getItem("oneUser");
    localStorage.removeItem("routineDelete");
    if(userSerializado){
      this.user = JSON.parse(userSerializado);
    } 
      this.position = this.verificarUsuarioExistente(this.user);
      console.log(this.user);
      
      if(this.position>=0){ ///ENCONTRO EL USUARIO 
        if(this.user.newSeason != undefined){
          this.newSeason = this.user.newSeason;
          this.months = this.newSeason.months;
        }
        let monthStorage = localStorage.getItem("monthSelected");
      if(monthStorage){
        this.monthSelected = JSON.parse(monthStorage);  
      }
      if(this.user.routinesXcalendar != undefined){
        this.routinesXcalendar = this.user.routinesXcalendar;
      }
        ///this.check();
        ///this.monthSelected = this.months[this.monthSelected.monthNumber-1];
      }
  }
  verificarUsuarioExistente(user: Usuario): number{
    let i=0;
    let position = -1;
      while(i<this.usersList.length && user.email != this.usersList[i].email){
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
  changeMonth(option: string){
    if(option === "previous"){
      if(this.monthSelected.monthNumber==1){
        alert("No se puede volver al año anterior");
      }else{
        this.monthSelected = this.months[this.monthSelected.monthNumber-2];
        localStorage.setItem("monthSelected", JSON.stringify(this.monthSelected));
      }
    }else{
      if(this.monthSelected.monthNumber==12){
        alert("No se puede avanzar al siguiente año hasta el momento");
      }else{
        this.monthSelected = this.months[this.monthSelected.monthNumber];
        localStorage.setItem("monthSelected", JSON.stringify(this.monthSelected));
      }
    }
    location.reload();
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  displayQuest(nameBlock: string, buttonBlock: string, nameNone: string, buttonNone: string){
    Display.displayBlock(nameBlock);
    Display.displayBlock(buttonBlock);
    Display.displayNone(nameNone);
    Display.displayNone(buttonNone);
    this.addButtonDisplayed = true;
  }
  deleteDisplay(){
    let position = -1;
    for(let i=0; i<this.routinesXcalendar.length; i++){
      if(this.routinesXcalendar[i].startingMonth.monthNumber == this.monthSelected.monthNumber){
        position = i;
      }
    }
    if(position>=0){
      Display.displayBlock("deleteRoutine");
    }else{
      alert("No routines founded this month");
    }
  }
  selectFirstDay(dayAux: day, monthAux: month){
    let firstDay = document.getElementById("selectStart");
    let lastDay = document.getElementById("selectFinish");
    if(firstDay){
      if(firstDay.style.display == 'block' && lastDay?.style.display == 'none'){
        if(dayAux.occuped == true){
          alert("The day is already on use by another routine");
        }else{
          if(dayAux.number < this.currentDate.getDate() && monthAux.monthNumber == this.currentDate.getMonth()+1){            
            alert("You cannot set a routine for a day that already past");
          }else{
        localStorage.removeItem("firstDayCalendar");
        localStorage.setItem("firstDayCalendar", JSON.stringify(dayAux));
        localStorage.removeItem("firstMonthCalendar");
        localStorage.setItem("firstMonthCalendar", JSON.stringify(monthAux));
        this.selectedDay = dayAux;
        }
        }
      }
    
    }
      if(lastDay){
        if(lastDay.style.display == 'block' && firstDay?.style.display == 'none'){
          if(dayAux.occuped == true){
            alert("The day is already on use by another routine");
          }else{
            let firstDayAux = localStorage.getItem("firstDayCalendar");
            let dayAuxFirst: day = new day(0,'',0);
            if(firstDayAux){
              dayAuxFirst = JSON.parse(firstDayAux);
            }
            if(this.isOccuped(monthAux, dayAuxFirst, dayAux)){
              alert("There are days already in use between first and last day assigned");
            }else{
            if(dayAux.number < dayAuxFirst.number){
              alert("Last day cannot be earlier than first day");
            }else{
          localStorage.removeItem("lastDayCalendar");
          localStorage.setItem("lastDayCalendar", JSON.stringify(dayAux));
          localStorage.removeItem("lastMonthCalendar");
          localStorage.setItem("lastMonthCalendar", JSON.stringify(this.monthSelected));
          this.selectedDay = dayAux;
          }
        }
        }
        }
      }
      localStorage.setItem("calendarDate", JSON.stringify(true));
  }
isOccuped(monthAux: month, firstDay: day, lastDay: day): boolean{
  let i=0;
  let access: boolean = false;
  while(i<monthAux.days.length && !access){
    if(monthAux.days[i].number >= firstDay.number && monthAux.days[i].number <= lastDay.number){
      if(monthAux.days[i].occuped == true){
        access = true;
      }else{
        i++;
      }
    }else{
      i++;
    }
  }
  return access;
}
check(){
  let routinesAux = localStorage.getItem("routinesScheduled");
  let daysOfMonth: Array<day> = [];
    if(routinesAux){
      this.routinesXcalendar = JSON.parse(routinesAux);    
  
      for(let i=0; i<this.routinesXcalendar.length; i++){
        if(this.routinesXcalendar[i].startingMonth.monthNumber == this.monthSelected.monthNumber){
          daysOfMonth = this.routinesXcalendar[i].startingMonth.days;
        for(let m=0; m<daysOfMonth.length; m++){
          if((daysOfMonth[m].number >= this.routinesXcalendar[i].startingDay.number) && (daysOfMonth[m].number <= this.routinesXcalendar[i].lastDay.number)){
            daysOfMonth[m].occuped = true;         
          }else{
            daysOfMonth[m].occuped = false;
          }
          this.months[this.routinesXcalendar[i].startingMonth.monthNumber-1].days = daysOfMonth;
        }
        this.routinesXcalendar[i].startingMonth.days = daysOfMonth;
        }
      }
      this.season.months = this.months;
      localStorage.setItem("2024", JSON.stringify(this.season));
      localStorage.setItem("routinesScheduled", JSON.stringify(this.routinesXcalendar));
    }
    return daysOfMonth;
}
isDayOccuped(dayAux: day): boolean{
  if(dayAux.occuped){  
    return true;
  }else{    
    return false;
  }
}
changeWindowToRoutine(rutina: routine) {
  const rutinaSerializada = JSON.stringify(rutina);
  const nuevaURL = `specificRoutine?parametro=${encodeURIComponent(rutinaSerializada)}`;
  window.location.href = nuevaURL;
}
monthsCheck(routineSelected: routineScheduled): boolean{
  if(routineSelected.startingMonth.monthNumber == this.monthSelected.monthNumber){ 
    return true;
  }else{
    return false;
  }
}
clickRoutine(routineScheduled: routineScheduled){
  localStorage.removeItem("routineDelete");
  localStorage.setItem("routineDelete", JSON.stringify(routineScheduled));
}
isRoutineSelected(routineScheduled: routineScheduled): boolean{
  let routineAux = localStorage.getItem("routineDelete");
  if(routineAux){
    let routineStoraged: routineScheduled = JSON.parse(routineAux);
    if(routineStoraged.routines.name == routineScheduled.routines.name){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
}
deleteRoutine(){
  let routineAux = localStorage.getItem("routineDelete");
  if(routineAux){
    let routineScheduled: routineScheduled = JSON.parse(routineAux);
    let confirmation = confirm("Are you sure you want to delete "+ routineScheduled.routines.name + " from the calendar?");
    if(confirmation){
      let index = -1;
      for(let i=0; i<this.routinesXcalendar.length; i++){
        if(this.routinesXcalendar[i].routines.name == routineScheduled.routines.name){
          index = i;
        }
      }
      if(index>=0){
        this.routinesXcalendar.splice(index, 1);
      }
      this.user.routinesXcalendar = this.routinesXcalendar;
      this.usersList[this.position] = this.user;
      localStorage.setItem("oneUser", JSON.stringify(this.user));
      localStorage.setItem("users", JSON.stringify(this.usersList));
      this.unBlockDaysOccuped(this.monthSelected, routineScheduled.startingDay, routineScheduled.lastDay);
      Display.displayNone("deleteRoutine");
      alert("Successfully deleted");
      window.location.href = 'calendar';
    }
  }
}
unBlockDaysOccuped(monthAux: month, firstDay: day, lastDay: day){
  for(let i=0; i<monthAux.days.length; i++){
    let currDate: day = monthAux.days[i];
    console.log("COLOR DAY "+currDate.number+": "+currDate.color);
    
    if((currDate.number >= firstDay.number) && (currDate.number <= lastDay.number)){
      console.log("CURRENT DATE: "+currDate.number);
      console.log("LAST DAY: "+lastDay.number);
      
      currDate.occuped = false;
      currDate.color = undefined;
      monthAux.days[i].color = currDate.color;
      monthAux.days[i].occuped = currDate.occuped;
      ///console.log("TRUE "+ currDate.number);
    }
  }
  this.months[monthAux.monthNumber-1] = monthAux;
  this.newSeason.months = this.months;
  this.user.newSeason = this.newSeason;
  localStorage.setItem("oneUser", JSON.stringify(this.user));
  this.usersList[this.position] = this.user;
  localStorage.setItem("users", JSON.stringify(this.usersList));
}
}
//                <p id="routineName" (click)="changeWindowToRoutine(routineScheduled.routines)">{{routineScheduled.routines.name}}</p>
