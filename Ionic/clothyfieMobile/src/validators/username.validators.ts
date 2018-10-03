import { AbstractControl } from "@angular/forms/src/model";
import { ValidationErrors } from "@angular/forms/src/directives/validators";



export class UserNameValidator{
    static CannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0){
            return { CannotContainSpace : true };
        }
    }

    static ShouldBeUnique(control : AbstractControl) : Promise<ValidationErrors | null> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(control.value === 'murali'){
                    resolve({ ShouldBeUnique : true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }
}