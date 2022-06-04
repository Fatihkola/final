import { Odev } from './../../models/Odev';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-odevlistele',
  templateUrl: './odevlistele.component.html',
  styleUrls: ['./odevlistele.component.scss']
})
export class OdevlisteleComponent implements OnInit {
  kayitlar:Kayit[];
  secOdev:Odev;
  odevId:string;
  displayedColumns=['odevDersAdi', 'odevKonu','islemler'];
  dataSource:any;



  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p){
        this.odevId=p.odevId;
        this.OdevGetir();
      }
    });
  }
  OdevGetir(){
    this.apiServis.OdevById(this.odevId).subscribe((d:Odev)=>{
      this.secOdev=d;
    });
  }
  KayitListele(){

  }

}

