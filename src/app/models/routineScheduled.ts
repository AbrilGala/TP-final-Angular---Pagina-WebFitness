import { day } from "./day";
import { month } from "./month";
import { routine } from "./routine";

export class routineScheduled {
    routines: routine;
    startingDay: day;
    lastDay: day;
    startingMonth: month;
    color: string;
    constructor(routines: routine, startingDay: day, lastDay: day, startingMonth: month, color: string){
        this.routines = routines;
        this.startingDay = startingDay;
        this.lastDay = lastDay;
        this.startingMonth = startingMonth;
        this.color = color;
    }
}