import { Ogrenci } from './../../models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ActivatedRoute } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.scss']
})
export class DerslisteleComponent implements OnInit {
  kayitlar:Kayit[];
  secOgrenci:Ogrenci;
  ogrId:string;
  displayedColumns=['dersKodu','dersAdi','dersKredi','islemler'];
  dataSource:any;


  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p){
        this.ogrId=p.ogrId;
        this.OgrenciGetir();
      }
    });
  }
  OgrenciGetir(){
    this.apiServis.OgrenciById(this.ogrId).subscribe((d:Ogrenci)=>{
      this.secOgrenci=d;
    });
  }
  KayitListele(){

  }

}
