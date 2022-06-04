import { Ders } from './../models/Ders';
import { Ogrenci } from './../models/Ogrenci';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Odev } from '../models/Odev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl= "http://localhost:18633/api/";

constructor(
  public http:HttpClient
) { }

OgrenciListe(){
  return this.http.get(this.apiUrl+"ogrenciliste");
}
OgrenciById(ogrId:string){
  return this.http.get(this.apiUrl+"ogrencibyid/"+ogrId);
}
OgrenciEkle(ogr:Ogrenci){
  return this.http.post(this.apiUrl+"ogrenciekle",ogr);
}
OgrenciDuzenle(ogr:Ogrenci){
  return this.http.put(this.apiUrl+"ogrenciduzenle",ogr)
}
OgrenciSil(ogrId:string){
  return this.http.delete(this.apiUrl+"ogrencisil/"+ogrId);
}


DersListe(){
  return this.http.get(this.apiUrl+"dersliste");
}
DersById(dersId:string){
  return this.http.get(this.apiUrl+"dersbyid/"+dersId);
}
DersEkle(ders:Ders){
  return this.http.post(this.apiUrl+"dersekle",ders);
}
DersDuzenle(ders:Ders){
  return this.http.put(this.apiUrl+"dersduzenle",ders)
}
DersSil(dersId:string){
  return this.http.delete(this.apiUrl+"derssil/"+dersId);
}


OdevListe(){
  return this.http.get(this.apiUrl+"odevliste");
}
OdevById(odevId:string){
  return this.http.get(this.apiUrl+"odevbyid/"+odevId);
}
OdevEkle(odev:Odev){
  return this.http.post(this.apiUrl+"odevekle",odev);
}
OdevDuzenle(odev:Odev){
  return this.http.put(this.apiUrl+"dersduzenle",odev)
}
OdevSil(odevId:string){
  return this.http.delete(this.apiUrl+"odevsil/"+odevId);
}
}
