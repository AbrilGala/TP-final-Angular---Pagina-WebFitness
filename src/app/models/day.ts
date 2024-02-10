export class day{
    number: number;
    dayName: string;
    weekDay: number;
    occuped: boolean = false;
    color: string | undefined;
    constructor(number: number, dayName: string, weekDay: number){
        this.number = number;
        this.dayName = dayName;
        this.weekDay = weekDay;
    }
}