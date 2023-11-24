import { Component, OnInit } from '@angular/core';
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
        this.routinesList = this.user.userRoutines;
      }
 }
 deleteRoutine(){

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
