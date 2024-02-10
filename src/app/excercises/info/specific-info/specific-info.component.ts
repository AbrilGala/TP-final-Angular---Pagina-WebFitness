import { Component, OnInit } from '@angular/core';
import { Display } from 'src/app/display/display';
import { Excercise } from 'src/app/models/excercise';
import { Usuario } from 'src/app/models/usuario';
import { Validators } from 'src/app/validators/validators';

@Component({
  selector: 'app-specific-info',
  templateUrl: './specific-info.component.html',
  styleUrls: ['./specific-info.component.css']
})
export class SpecificInfoComponent implements OnInit {
  excerciseList: Array<Excercise>=[];
  urlParams = new URLSearchParams(window.location.search);
  ejercicioSerializado = this.urlParams.get('parametro');
  async ngOnInit(): Promise<void> {
    const userSerializado = localStorage.getItem("oneUser");
    let user: Usuario = new Usuario("","","");
    if(userSerializado){
      user = JSON.parse(userSerializado);
    }
  if (this.ejercicioSerializado) { 
    const exercise: Excercise = JSON.parse(decodeURIComponent(this.ejercicioSerializado));    
    let titulo = document.getElementById("title");
    let type = document.getElementById("type")
    let difficulty = document.getElementById("difficulty");
    let muscle = document.getElementById("muscle");
    let equipment = document.getElementById("equipment");
    let instruction = document.getElementById("instruction");

    if(titulo!=null){
      titulo.innerHTML = exercise.name;
    }
    if(type!=null){
      type.innerHTML = "TYPE: " + exercise.type;
    }
    if(difficulty!=null){
      difficulty.innerHTML = "DIFFICULTY: " + exercise.difficulty;
    }
    if(muscle!=null){
      muscle.innerHTML = "MUSCLE: " + exercise.muscle;
    }
    if(equipment!=null){
      equipment.innerHTML = "EQUIPMENT: " + exercise.equipment;
    }
    if(instruction!=null){
      instruction.innerHTML = "INSTRUCTIONS: " + exercise.instructions;
    }
  }
  }
  agregarArutinaDisplay(){
    Display.displayBlock("repsDiv");
  }
  agregarArutina(){
    let input = document.getElementById("repsInp") as HTMLInputElement;
    if(input){
      let inputValue = input.value;
      let inputNumber = parseInt(inputValue);
      if (this.ejercicioSerializado) { 
        const exercise: Excercise = JSON.parse(decodeURIComponent(this.ejercicioSerializado)); 
        exercise.reps = inputNumber;
        const nuevoEJ = JSON.stringify(exercise);
        const nuevaURL = `routines?parametro=${encodeURIComponent(nuevoEJ)}`;
        window.location.href = nuevaURL;
      }
    }
  }
}
