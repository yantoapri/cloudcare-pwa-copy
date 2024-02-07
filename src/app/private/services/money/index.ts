import { Injectable } from '@angular/core';
import { CurrencyMaskInputMode } from 'ngx-currency';
@Injectable({
	providedIn: 'root'
})
export class MoneyService {
    formatRupiah(angka){
        if(angka!=""&&angka!=null&&angka!=undefined&&angka!=0){
            angka=angka.toString().replace(".00")
            var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split   		= number_string.split(','),
            sisa     		= split[0].length % 3,
            rupiah     		= split[0].substr(0, sisa),
            ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

            // tambahkan titik jika yang di input sudah menjadi angka ribuan
            if(ribuan){
                let separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }

            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
            return rupiah ? 'Rp ' + rupiah+',00' : '';
        }else{
            return "Rp 0,00"
        }
    }
    currency(){
        return {
            align: "left",
            allowNegative: true,
            allowZero: true,
            decimal: ",",
            precision: 2,
            prefix: "Rp ",
            suffix: "",
            thousands: ".",
            nullable: true,
            min: null,
            max: null,
            inputMode:CurrencyMaskInputMode.NATURAL
        }
    }
}