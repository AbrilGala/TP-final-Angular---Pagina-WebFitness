export class Display {
    static displayBlock(name: string){
        let miDiv = document.getElementById(name);
            if(miDiv){
            miDiv.style.display = 'block';
            }
      }
     static displayNone(name: string){
        let miDiv = document.getElementById(name);
            if(miDiv){
            miDiv.style.display = 'none';
            }
      }
}