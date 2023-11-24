import { Component, Input } from '@angular/core';
import { Excercise } from '../models/excercise';
import { Block } from '@angular/compiler';
import { routine } from '../models/routine';
import { UserService } from '../user.service';
import { Usuario } from '../models/usuario';
import { Display } from '../display/display';

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
  user: Usuario = new Usuario("","","");
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
  displayCreate(){
    window.location.href = 'createRoutine';
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


showRoutines(){
  window.location.href = 'publicRoutinesShow';
}

changeWindowLogin(name: string) {
  window.location.href = `${name}`;
}
}
