import { Component } from '@angular/core';
import { Display } from 'src/app/display/display';
import { routine } from 'src/app/models/routine';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent {
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
        let created = localStorage.getItem("created");
        let repeated = localStorage.getItem("repeated");
        if(created){
          let createdBoolean =  JSON.parse(created);          
          if(createdBoolean){
            this.displayMessage("green");
            Display.displayNone("repeated");
            Display.displayBlock("created");
          }
        }else{
          if(repeated){            
            let repeatedBoolean = JSON.parse(repeated);
            if(repeatedBoolean){
              this.displayMessage("red");
              Display.displayNone("created");
              Display.displayBlock("repeated");
            }
          }else {
            Display.displayNone("messages");
            Display.displayNone("created");
            Display.displayNone("repeated");
          }
        }
        localStorage.removeItem("created");
        localStorage.removeItem("repeated");
          Display.displayBlock("create");
     }
    }
    displayMessage(color: string){
      let miDiv = document.getElementById("messages");
      if(miDiv){
        miDiv.style.display = 'block';
        miDiv.style.backgroundColor = color;
      }
    }
    crearRutina(){
      var inputValor = <HTMLInputElement>document.getElementById("nameRoutine");
      let input = inputValor.value;
      var privateOptionAccess = <HTMLInputElement>document.getElementById("privateAccessInp");
      var publicOptionAccess = <HTMLInputElement>document.getElementById("publicAccessInp");
      let optionAccessValue = false;
      if(privateOptionAccess.checked){
        console.log("PRIVADO");
        
        optionAccessValue = false;
      }else {
        if(publicOptionAccess.checked){
          console.log("PUBLICO");
          
          optionAccessValue = true;
        }
      }
      let rutina: routine = new routine(input, this.routinesList.length, optionAccessValue);
      let access = this.verificarRutina(rutina);
      if(access){
        this.routinesList.push(rutina);
      this.user.userRoutines = this.routinesList;
      localStorage.setItem("oneUser", JSON.stringify(this.user));
      this.usersList[this.position] = this.user;
      localStorage.setItem("users", JSON.stringify(this.usersList));
      localStorage.setItem("created", JSON.stringify(true));
      localStorage.removeItem("repeated");
      }else{
        localStorage.setItem("repeated", JSON.stringify(true));
        localStorage.removeItem("created");
      }
      location.reload();

    }
    verificarRutina(rutina: routine): boolean{
      let i = 0;
      let access = true;
      while(i<this.routinesList.length && access == true){
        if(this.routinesList[i].name == rutina.name){
          access = false;
        }else{
          i++;
        }
      }
      return access;
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
    desmarcarOpcion(otraOpcion: any) {
      let opcion = document.getElementById(otraOpcion) as HTMLInputElement;
      if(opcion){
        opcion.checked = false;
      }
    }
    backToList(name: string){
      window.location.href = name;
    }
}
