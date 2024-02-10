import { Component, OnInit } from '@angular/core';
import { Excercise } from 'src/app/models/excercise';
import { routine } from 'src/app/models/routine';

@Component({
  selector: 'app-specific-information',
  templateUrl: './specific-information.component.html',
  styleUrls: ['./specific-information.component.css']
})
export class SpecificInformationComponent implements OnInit{
  urlParams = new URLSearchParams(window.location.search);
  rutinaSerializada = this.urlParams.get('parametro');
  excerciseList: Excercise[] = [];
  routine: routine = new routine ('', 0, false);

  ngOnInit(): void {
    if(this.rutinaSerializada){
    this.routine= JSON.parse(this.rutinaSerializada);
      let routineName = document.getElementById("name");
      if(routineName){
        routineName.innerHTML = this.routine.name;
      }
    if(this.routine.excerciseList.length > 0) {
      this.excerciseList = this.routine.excerciseList;
    }else {
      let miDiv = document.getElementById("noExercises");
      if(miDiv){
        miDiv.style.display = 'block';
      }
    }
    }
  }

  backToList(name: string){
    window.location.href = name;
  }

  changeWindow() {
    localStorage.setItem('toDelete', JSON.stringify(this.routine));
    window.location.href = `deleteRoutine`;
  }

}
