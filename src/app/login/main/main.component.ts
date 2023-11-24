import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from '../../user.service'; // Ruta relativa para navegar hacia atrás y luego al servicio
import { Validators } from 'src/app/validators/validators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  userList: Array<Usuario> = [];
  ngOnInit(): void {
    let registeredMessage = localStorage.getItem('registered');
    if(registeredMessage){
      this.displayMessages("messages", "green");
      this.displayBlock("registeredMessage");
      localStorage.removeItem("registered");
    }
    let repeatedMessage = localStorage.getItem('repeated');
    if(repeatedMessage){
      this.displayMessages("messages", "red");
      this.displayBlock("repeatedMessage");
      localStorage.removeItem('repeated');
    }
    let wrongAccess = localStorage.getItem('wrongAccess');
    if(wrongAccess){
      this.displayMessages("messages", "red");
      this.displayBlock("wrongLogIn");
      localStorage.removeItem('wrongAccess');
    }
  }
  //storedData = localStorage.getItem('key'); // Obtiene los datos del almacenamiento local
  //private userService: UserService =  this.storedData ? JSON.parse(this.storedData) : null;
  constructor(private userService: UserService) {
    this.userList = userService.obtenerUsuarios();
  }
  @Input()
  email: string = "";
  userName: string = "";
  password: string = "";
  register: boolean = true;
  //Cuando se sube el formulario, se crea el nuevo Usuario y lo agrega a la lista de usuarios:
  onSubmit(event: Event){
    event.preventDefault();
    if(!Validators.validateEmail(this.email)){
      alert('Please enter a valid email');
    }else{
      if(!Validators.validateInput(this.userName)){
        alert('Please enter a userName');
      }else{
        if(!Validators.validatePassword(this.password)){
        }else {
          this.verifyUserRegistration();
          if(this.register == true) {
          let nuevoUsuario: Usuario = new Usuario (this.email, this.userName, this.password, this.userList.length);
          this.userService.agregarUsuario(nuevoUsuario);
          this.userService.persistirDatos();
          this.userList = this.userService.obtenerUsuarios();
          localStorage.setItem('registered', 'You have been registered successfully');
    } else {
      localStorage.setItem('repeated', 'The email is already used by another account');
    }
    location.reload(); 
        }
      }
    }   
  }
  verifyUserRegistration() {
    let i = 0
    while(i<this.userList.length && this.register == true) {
      if(this.email == this.userList[i].email) {
        this.register = false;
      }else {
        i++;
      }
    }
  }
  @Input()
  emailAux: string = "";
  passAux: string = "";
  access: boolean = false;
  loginButton(event: Event) {
    event.preventDefault();
    console.log(this.emailAux);
    console.log(this.passAux);
    console.log(this.userList);
    let position = this.verifyUserLogin(this.emailAux, this.passAux);
    if(this.access) {
      ///Arranca el programa
      localStorage.setItem("oneUser", JSON.stringify(this.userList[position]));
      /*const usuarioSerializado = JSON.stringify(this.userList[position]);
      const nuevaURL = `?parametro=${encodeURIComponent(usuarioSerializado)}`;*/
      window.location.href = '';
    }else {
      localStorage.setItem('wrongAccess', 'The email or password is incorrect');
      location.reload();
    }
  }
  verifyUserLogin(emailAux1: string, passAux1: string): number {
    let i = 0
    while(i<this.userList.length && this.access == false) {
      if(emailAux1 == this.userList[i].email) {
        if(passAux1 == this.userList[i].password) {
          this.access = true;
          console.log("ACCESO CONCEDIDO");
        }else {
        }
      }
      i++;
    }
    if(!this.access){
      console.log("EMAIL O CONTRASEÑA INCORRECTOS");
    }
    return i-1;
  }
  displayBlock(name: string){
    let miDiv = document.getElementById(name);
        if(miDiv){
        miDiv.style.display = 'block';
        }
  }
  displayNone(name: string){
    let miDiv = document.getElementById(name);
        if(miDiv){
        miDiv.style.display = 'none';
        }
  }
  displayMessages(name: string, color: string){
    let miDiv = document.getElementById(name);
        if(miDiv){
        miDiv.style.display = 'block';                
        miDiv.style.backgroundColor = color;
        }
  }
}
