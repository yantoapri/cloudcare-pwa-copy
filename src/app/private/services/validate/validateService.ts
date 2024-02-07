import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ValidateService {
    isNumber(angka){
        angka=angka.match(/^[0-9]+$/)?angka:angka.replace(/[^0-9]/g, "")
        return angka;
    }
    isAlpha(text){
        return text.match(/^[A-Za-z]+$/)?text:text.replace(/[^A-Za-z]/g, "")
    }
    Number(e){
        const charCode = e.which ? e.which : e.keyCode;
        if(charCode==46){
            var txt=e.target.value;
            if(!(txt.indexOf(".") > -1)){
	
                return true;
            }
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57) )
            return false;

        return true;
    }
}