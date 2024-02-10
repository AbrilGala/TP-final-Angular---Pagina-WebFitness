import { routine } from "./routine";
import { routineScheduled } from "./routineScheduled";
import { season } from "./season";

export class Usuario {
    firstName: string | undefined;
    lastName: string | undefined;
    age: number | undefined;
    weight: number | undefined;
    height: number | undefined;
    email: string;
    userName: string;
    password: string;
    userRoutines: Array<routine>
    bmi: number | undefined;
    id: number | undefined;
    bmiStatus: string | undefined;
    newSeason: season | undefined;
    routinesXcalendar: Array<routineScheduled> = [];
    
    constructor(email: string,userName: string,password: string, id?: number, firstName?: string,lastName?: string,age?: number,weight?: number,height?: number, bmi?: number, bmiStatus?: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.weight = weight;
      this.height = height;
      this.email = email;
      this.userName = userName;
      this.password = password;
      this.userRoutines = [];
      this.id = id;
      this.bmi = bmi;
      this.bmiStatus = bmiStatus;
    }
    
    getEmail(){
      return this.email;
    }
  }
  