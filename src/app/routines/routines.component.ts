import { Component, Input } from '@angular/core';
import { Excercise } from '../models/excercise';
import { Block } from '@angular/compiler';
import { routine } from '../models/routine';
import { UserService } from '../user.service';
import { Usuario } from '../models/usuario';
import { Display } from '../display/display';
<<<<<<< HEAD
import { first, last } from 'rxjs';
import { routineScheduled } from '../models/routineScheduled';
import { day } from '../models/day';
import { month } from '../models/month';
import { season } from '../models/season';
=======
>>>>>>> e4b411f21c8f424754869f7b7d8787765b20acfe

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent {
  urlParams = new URLSearchParams(window.location.search);
  ejercicioSerializado = this.urlParams.get('parametro');
  exerciseAdded = this.urlParams.get('access');
  routinesList: routine[] = [];
  publicRoutinesList: routine[] = [];
  usersList: Usuario[] = [];
  position = -1;
  addToCalendar: boolean = false;
  user: Usuario = new Usuario("","","");
  months: Array<month> = [];
  newSeason: season = new season(0, [], 0);
  constructor(userService: UserService){
    this.usersList = userService.obtenerUsuarios();
  }
  async ngOnInit(): Promise<void> {
    const userSerializado = localStorage.getItem("oneUser");
    if(userSerializado){
      this.user = JSON.parse(userSerializado);
    } 
      this.position = this.verificarUsuarioExistente(this.user);
      console.log(this.user);
      
      if(this.position>=0){ ///ENCONTRO EL USUARIO 
        if(this.user.newSeason){
          this.newSeason = this.user.newSeason;
          this.months = this.newSeason.months;
        }
        if(this.ejercicioSerializado){
          Display.displayBlock("selectRoutine");
        }
        this.routinesList = this.user.userRoutines;
        Display.displayBlock("logged");
        Display.displayNone("notLogged");
        Display.displayNone("notLoggedMessage");
        Display.displayBlock('optionCreate');
        Display.displayBlock('optionLook');
        Display.displayBlock("optionDelete");
        if(this.routinesList.length>0){
<<<<<<< HEAD
          if(this.verificarCalendario() == true){
            this.addToCalendar = true;
          }
=======
>>>>>>> e4b411f21c8f424754869f7b7d8787765b20acfe
          Display.displayBlock('routinesFounded');
          let info = document.getElementById("routineName");
          for(let i=0; i<this.routinesList.length; i++) {
            if(info){
              info.innerHTML += "\n" + this.routinesList[i].name;
            }
          }
        }else {
          Display.displayBlock('noRoutines')
        }
      }else { ///NO HAY UN USUARIO LOGUEADO
        console.log("Para acceder a las rutinas debes estar logueado");
      }
      for(let i = 0; i<this.usersList.length; i++){
        console.log("PRIMER FOR");
        for(let m = 0; m<this.usersList[i].userRoutines.length; m++){
          console.log("SEGUNDO FOR");
          if(this.usersList[i].userRoutines[m].publicRoutine == true) {
            this.usersList[i].userRoutines[m].userName = this.usersList[i].userName;
            this.publicRoutinesList.push(this.usersList[i].userRoutines[m]);
          }
        }
      }
      localStorage.setItem("publicRoutines", JSON.stringify(this.publicRoutinesList));
    }
<<<<<<< HEAD
  displayCreate(name: string){
    window.location.href = name;
  }
  chooseRoutine(routineAux: routine){
    let firstDayStoraged = localStorage.getItem("firstDayCalendar");
    let lastDayStoraged = localStorage.getItem("lastDayCalendar");
    let firstMonthStoraged = localStorage.getItem("firstMonthCalendar");
    if(firstDayStoraged && lastDayStoraged && firstMonthStoraged){
      let firstDay: day = JSON.parse(firstDayStoraged);
      let lastDay: day = JSON.parse(lastDayStoraged);
      let firstMonth: month = JSON.parse(firstMonthStoraged);
      let routinesScheduled: Array<routineScheduled> = [];
      let color = this.blockDaysOccuped(firstMonth, firstDay, lastDay);
      routineAux.isScheduled = true;
      routineAux.firstDays.push(firstDay);
      routineAux.lastDays.push(lastDay);
      console.log("POST FD LD");
      
      this.routinesList[routineAux.id] = routineAux;
      this.user.userRoutines = this.routinesList;
      let newRoutineScheduled = new routineScheduled(routineAux, firstDay, lastDay, firstMonth, color);
      routinesScheduled.push(newRoutineScheduled);
      this.user.routinesXcalendar.push(newRoutineScheduled);
      localStorage.setItem("oneUser", JSON.stringify(this.user));
      this.usersList[this.position] = this.user;
      localStorage.setItem("users", JSON.stringify(this.usersList));
      localStorage.setItem("calendarAdded", JSON.stringify(true));
    }
    window.location.href = "calendar";
  }
  blockDaysOccuped(monthAux: month, firstDay: day, lastDay: day): string{
    let randomColor = this.generateRandomColor();
    for(let i=0; i<monthAux.days.length; i++){
      let currDate: day = monthAux.days[i];
      if((currDate.number >= firstDay.number) && (currDate.number <= lastDay.number)){
        currDate.occuped = true;
        currDate.color = randomColor;
        ///console.log("TRUE "+ currDate.number);
      }
      monthAux.days[i].color = currDate.color;
      monthAux.days[i].occuped = currDate.occuped;
    }
    this.months[monthAux.monthNumber-1] = monthAux;
    this.newSeason.months = this.months;
    this.user.newSeason = this.newSeason;
    localStorage.setItem("oneUser", JSON.stringify(this.user));
    this.usersList[this.position] = this.user;
    localStorage.setItem("users", JSON.stringify(this.usersList));
    return randomColor;
  }
  generateRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  }
  verificarCalendario(): boolean{
    let aux = localStorage.getItem("calendarDate");
    let exists: boolean = false;
    if(aux){
      exists = JSON.parse(aux);
      localStorage.removeItem("calendarDate");
    }
    return exists;
=======
  displayCreate(){
    window.location.href = 'createRoutine';
>>>>>>> e4b411f21c8f424754869f7b7d8787765b20acfe
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
  changeWindow(rutina: routine) {
    const rutinaSerializada = JSON.stringify(rutina);
    const nuevaURL = `specificRoutine?parametro=${encodeURIComponent(rutinaSerializada)}`;
    window.location.href = nuevaURL;
}


verificarEjercicioExistente(exercise: Excercise, rutina: routine): boolean{
  let access = true;
  if(rutina.excerciseList.length>0){
    let i = 0;
    while(i<rutina.excerciseList.length && access){
      if(rutina.excerciseList[i].id == exercise.id){
        access = false;
      }
      i++;
    }
  }
  return access;
}


addEx(rutina: routine){
  Display.displayNone("selectRoutine");
  if (this.ejercicioSerializado) { 
    const exercise: Excercise = JSON.parse(decodeURIComponent(this.ejercicioSerializado));
    let acceso = this.verificarEjercicioExistente(exercise, rutina);
    if(acceso){
    rutina.excerciseList.push(exercise);
    this.routinesList[rutina.id] = rutina;
    this.user.userRoutines = this.routinesList;
    localStorage.setItem("oneUser", JSON.stringify(this.user));
    this.usersList[this.position] = this.user;
    localStorage.setItem("users", JSON.stringify(this.usersList));
    this.changeWindow(rutina);
    }else{
     Display.displayNone("selected");
      Display.displayBlock("repeated");
    }
  }else{
    this.changeWindow(rutina);
  }
}
<<<<<<< HEAD
=======


>>>>>>> e4b411f21c8f424754869f7b7d8787765b20acfe
showRoutines(){
  window.location.href = 'publicRoutinesShow';
}

changeWindowLogin(name: string) {
  window.location.href = `${name}`;
}
}
