import { Component, OnInit } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { ExcercisesComponent } from '../excercises/excercises.component';
import { ExcerciseService } from '../excercise.service';
import { Excercise } from '../models/excercise';
import { Usuario } from '../models/usuario';
import { ExerciseDataService } from '../exercise-data-service.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { routine } from '../models/routine';


@Component({
  selector: 'app-chineseff4',
  templateUrl: './chineseff4.component.html',
  styleUrls: ['./chineseff4.component.css']
})
export class Chineseff4Component implements OnInit {
  excerciseList: Array<Excercise> = [];
  usersList: Usuario[] = [];
  routinesList: routine[] = [];
  user: Usuario = new Usuario("","","");
  private exerciseSubscription: Subscription = new Subscription;

  constructor(private excerciseService: ExcerciseService,private exerciseDataService: ExerciseDataService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    const userSerializado = localStorage.getItem("oneUser");
    this.user= new Usuario("","","");
    if(userSerializado){
      this.user = JSON.parse(userSerializado);
      this.displayNone("notLogged");
      this.displayBlock("logged");
      this.showUserData(this.user);
      
      await this.excerciseService.loadExercises();
      this.excerciseList = this.excerciseService.getExcercises();  
      this.excerciseList.splice(0,3);

      this.routinesList = this.user.userRoutines;
  
    }else {
    }
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
  showUserData(user: Usuario){
    let name = document.getElementById("userName");
    if(name) {
      name.innerHTML = 'Welcome '+user.userName.toUpperCase()+'!';
    }
    let routinesList = document.getElementById("routinesAmount");
    if(routinesList) {
      routinesList.innerHTML = 'You have '+user.userRoutines.length + " routines created!";
    }
  }
  changeWindow(name: string){
    window.location.href = name;
  }

  changeExerciseWindow(ejercicio: Excercise){
    const ejercicioSerializado = JSON.stringify(ejercicio);
    const nuevaURL = `specificInfo?parametro=${encodeURIComponent(ejercicioSerializado)}`;
    window.location.href = nuevaURL;
  }
  
  getRandomExercises(numExercises: number): Excercise[] {
    // Clona la lista original para no afectar el orden original
    const shuffledList = this.excerciseList;
  
    // Utiliza el algoritmo de Fisher-Yates para mezclar la lista
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
  
    // Devuelve los primeros numExercises elementos de la lista mezclada
    return shuffledList.slice(0, numExercises);
  }
  
  showRoutines(){
    window.location.href = 'publicRoutinesShow';
  }
  
}