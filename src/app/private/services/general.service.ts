import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private authService : AuthService
  ) { }

  getUrlModule(key: string) {
    let array_repo = this.authService.currentUserValue.repo
    let index = array_repo.find((f) => { return f.key_repo == key })
    return index.url_repo
  }

  list24Hours(interval : number = 60, waktu_mulai : string = '05:00') {
    let waktu = this.generateHoursInterval(60 * 0, 60 * 24, interval)
    // return waktu
    let ketemu = waktu.findIndex(i => {
      return i == waktu_mulai
    })

    let A = waktu.slice(ketemu, (waktu.length - 1))
    let B = waktu.slice(0, ketemu)
    return A.concat(B)
  }

  generateHoursInterval(startHourInMinute, endHourInMinute, interval) {
    const times = [];

    for (let i = 0; startHourInMinute < 24 * 60; i++) {
      if (startHourInMinute > endHourInMinute) break;
      var hh = Math.floor(startHourInMinute / 60); // getting hours of day in 0-24 format
      var mm = startHourInMinute % 60; // getting minutes of the hour in 0-55 format
      times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      startHourInMinute = startHourInMinute + interval;
    }

    return times;
  }

}
