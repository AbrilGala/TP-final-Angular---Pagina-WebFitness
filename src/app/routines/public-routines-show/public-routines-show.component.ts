import { Component, OnInit } from '@angular/core';
import { routine } from 'src/app/models/routine';

@Component({
  selector: 'app-public-routines-show',
  templateUrl: './public-routines-show.component.html',
  styleUrls: ['./public-routines-show.component.css']
})
export class PublicRoutinesShowComponent implements OnInit {
  publicRoutinesList: routine[] = [];
  ngOnInit(): void {
    let routinesSerializadas = localStorage.getItem("publicRoutines");
    if(routinesSerializadas){
      this.publicRoutinesList = JSON.parse(routinesSerializadas);
    }
  }
  showRoutine(rutina: routine){
    this.changeWindow(rutina);
  }
  changeWindow(rutina: routine) {
    const rutinaSerializada = JSON.stringify(rutina);
    const nuevaURL = `specificRoutine?parametro=${encodeURIComponent(rutinaSerializada)}`;
    window.location.href = nuevaURL;
}
}
