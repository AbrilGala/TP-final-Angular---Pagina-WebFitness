import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { UserService } from "../user.service";
import { Usuario } from "../models/usuario";

export class Validators {
      static validateInput(input: string): boolean {
        if(input.length == 0){
            alert("El campo no puede estar vacio");
        }
        return input.length > 0;
      }
      static validatePassword(password: string) {
        const regexMayuscula = /[A-Z]/;
      const regexNumero = /[0-9]/;
      if(password.length == 0){
        alert("No puedes dejar en blanco la contraseña");
      }else{
        if(password.length<8){
          alert("La contraseña debe tener 8 caracteres como minimo");
        }else {
          if(!regexMayuscula.test(password)){
            alert("La contraseña debe contener al menos una mayuscula");
          }else{
            if(!regexNumero.test(password)){
              alert("la contraseña debe contener al menos un numero");
            }
          }
        }
      }
      return (
        password.length >= 8 &&
        regexMayuscula.test(password) &&
        regexNumero.test(password)
      )
      }

      static validateEmail(email: string){
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(email);
        console.log(regexEmail.test(email));
        
        return regexEmail.test(email);
      }

    // static emailExists(usuario: Usuario): AsyncValidatorFn {       
    //   return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    //     if (control.value == '') {
    //       return Promise.resolve(null);
    //     } else {
    //       return usuario.getEmail()
    //         .then(response => {
    //           return response !== null ? { 'emailExists': { value: control.value } } : null;
    //         })
    //         .catch(() => {
    //           return null; // Manejar errores aquí si es necesario
    //         });
    //     }
    //   };
    // }

}

