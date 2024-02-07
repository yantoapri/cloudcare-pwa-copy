import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  tabPane : any = {
    pane1: true,
    pane2: false,
    pane3: false,
    pane4: false,
  }
  time : string = '00:00'
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false

  constructor() { }

  ngOnInit(): void {
    


    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='AMATTD2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATTD1')!=-1?true:false

    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
      }
    this.counterTime()
  }

  counterTime() {
    var seconds, minutes = 0
    // var ;

    var startTime = new Date;

    setInterval(() => {

        var currentTime = new Date;
        seconds = currentTime.getSeconds() - startTime.getSeconds();

        if(seconds < 0){
            seconds += 60;
        }else if(seconds === 0){
            minutes = currentTime.getMinutes() - startTime.getMinutes();
        }
        let ini = (minutes <= 9 ? String('0' + minutes) : minutes)
        let sec = ( seconds <= 9 ? String('0' + seconds) : seconds)
        this.time = String( ini + ':' + sec)
        // console.log(this.time)

    }, 1000);
  }

  ShowTabPane(nomor : number) {
    if (nomor == 1) {
      this.tabPane.pane1 = true
      this.tabPane.pane2 = false
      this.tabPane.pane3 = false
      this.tabPane.pane4 = false
    } else if (nomor == 2) {
      this.tabPane.pane1 = false
      this.tabPane.pane2 = true
      this.tabPane.pane3 = false
      this.tabPane.pane4 = false
    } else if (nomor == 3) {
      this.tabPane.pane1 = false
      this.tabPane.pane2 = false
      this.tabPane.pane3 = true
      this.tabPane.pane4 = false
    } else {
      this.tabPane.pane1 = false
      this.tabPane.pane2 = false
      this.tabPane.pane3 = false
      this.tabPane.pane4 = true
    }
  }

}
