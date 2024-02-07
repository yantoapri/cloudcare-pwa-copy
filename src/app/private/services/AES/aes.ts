import { Injectable } from '@angular/core';
import { enc ,pad,AES,mode,lib } from "crypto-js";


import * as moment from 'moment';
@Injectable({
	providedIn: 'root'
})
export class AESService {
    constructor(
    ) {
    }

    getKeygen(val){
      return val+new Date(moment.utc(new Date(val)).format('YYYY-MM')+'-01').getTime()
    }
    encrypt(plainText,key,iv,size) {
        key = enc.Utf8.parse(key);
        iv  = enc.Utf8.parse(iv);
        return AES.encrypt(plainText, key, 
          { 
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC,
            keySize:size
          }).ciphertext.toString(enc.Hex);
      }
      
    decrypt(encryptedText,key,iv,size) { 
        key = enc.Utf8.parse(key);
        iv  = enc.Utf8.parse(iv);
        var cipherParams = lib.CipherParams.create({
          ciphertext: enc.Hex.parse(encryptedText)
        });
        return AES.decrypt(cipherParams,key, 
          { 
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC,
            keySize:size
          }).toString(enc.Utf8);
    }
    getIndexChar(key, charactersLength) {
      let indexChar = key / charactersLength; 
      return (indexChar < charactersLength ) ? indexChar : this.getIndexChar (indexChar, charactersLength); 
    }

    generateKey(length, randNumber) {
        let randomNumText      = '';
        const characters       = 'utOlP8VwyYqeIdQoSpRX7ci0vsMDJ6rkzCLbFHNxn9hWa23j4AgmTB5Ef1GKZU';
        const charactersLength = characters.length;

        for (let i = 1; i <= length; i++) {
            const randomIndex = Math.round(this.getIndexChar((i * randNumber), charactersLength));
            randomNumText += characters.charAt(randomIndex);
        }

        return randomNumText;
    }

    getKeyLogin(auth){
      let iv=auth.sessi_id.substring(auth.sessi_id.length-16,auth.sessi_id.length)
      let text=auth.sessi_id.substring(0,auth.sessi_id.length-16)
      let key=auth.sessi_time+new Date(moment.utc(auth.sessi_time).format('YYYY-MM')+'-01').getTime()
      let keyGen=this.generateKey(16,key)
      let decrip=this.decrypt(text,keyGen,iv,128)
      return {'key':decrip.substring(0,decrip.length-16),'iv':decrip.substring(decrip.length-16,decrip.length)}
    }
}