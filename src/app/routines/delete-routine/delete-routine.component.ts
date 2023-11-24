import { Component, OnInit } from '@angular/core';
import { Display } from 'src/app/display/display';
import { routine } from 'src/app/models/routine';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-delete-routine',
  templateUrl: './delete-routine.component.html',
  styleUrls: ['./delete-routine.component.css']
})
export class DeleteRoutineComponent implements OnInit {
  routinesList: routine[] = [];
  usersList: Usuario[] = [];
  position = -1;
  user: Usuario = new Usuario("","","");
  constructor(private userService: UserService){
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
        this.routinesList = this.user.userRoutines;
      }
 }
 deleteRoutine(){
  let miInput = document.getElementById("nameRoutineInp") as HTMLInputElement;
  if(miInput){
    let valor = miInput.value;
    let position = this.verificarRutina(valor);
    if(position>=0){
      this.routinesList.splice(position, 1);
      this.user.userRoutines = this.routinesList;
      localStorage.setItem("oneUser", JSON.stringify(this.user));
      if(this.user.id){
        this.usersList[this.user.id] = this.user;
        this.userService.users = this.usersList;
        this.userService.persistirDatos();
      }
      this.displayMessage("green");
      Display.displayBlock("deleted");
      Display.displayNone("notFounded");
    }else{
      this.displayMessage("red");
      Display.displayNone("deleted");
      Display.displayBlock("notFounded");
    }
  }
 }
 displayMessage(color: string){
  let miDiv = document.getElementById("messages");
  if(miDiv){
    miDiv.style.display = 'block';
    miDiv.style.backgroundColor = color;
  }
}
 verificarRutina(nombre: string): number{
  let i = 0;
  let access = false;
  while(i<this.routinesList.length && access == false){
    if(this.routinesList[i].name != nombre){
      i++;
    }else{
      access = true;
    }
  }
  if(i>=this.routinesList.length){
    return -1;
  }else{
    return i;
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
backToList(name: string){
  window.location.href = name;
}
}
