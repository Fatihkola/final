import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.scss']
})
export class DersComponent implements OnInit {
  [x: string]: any;

    dersler:Ders[];
    displayedColumns=['dersKodu','dersAdi','dersKredi','islemler'];
    dataSource:any;
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator;
      constructor(
        public apiServis:ApiService
      ) { }

      ngOnInit() {
        this.DersListele();
      }
      DersListele(){
        this.apiServis.DersListe();{
          this.apiServis.DersListe().subscribe((d:Ders[])=>{
            this.dersler=d;
            //console.log(d);
            this.dataSource=new MatTableDataSource(this.dersler)
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
          });
        }
      }

      Filtrele(e){
        var deger=e.target.value;
        this.dataSource.filter=deger.trim().toLowerCase();
        if (this.dataSource.paginator){
          this.dataSource.paginator.firstPage();
        }
      }
      Ekle(){
        var yeniKayit: Ders= new Ders();
        this.dialogRef=this.matDialog.open(DersDialogComponent,{
          width:'400px',
          data:{
            kayit:yeniKayit,
            islem:'ekle'
          }
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          //console.log(d);
          if(d){
            this.apiServis.DersEkle(d).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if(s.islem){
                this.DersListele();
              }
          });
          }
        });

      }

      Duzenle(kayit:Ders){

        this.dialogRef=this.matDialog.open(DersDialogComponent,{
          width:'400px',
          data:{
            kayit:kayit,
            islem:'duzenle'
          }
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          //console.log(d);
          if(d){
                kayit.dersAdi=d.dersAdi;
                kayit.dersKodu=d.dersKodu;
                kayit.dersKredi=d.dersKredi;
                this.apiServis.DersDuzenle(kayit).subscribe((s:Sonuc)=>{
                this.alert.AlertUygula(s);
                });
                }
        });
      }

      Sil(kayit:Ders){
        this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent,{
          width:'500px'
        });
        this.confirmdialogRef.componentInstance.dialogMesaj=kayit.dersAdi +"dersi silinecektir. Onaylıyor musunuz?"

        this.confirmdialogRef.afterClosed().subscribe(d=>{
          if(d){
            this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if (s.islem){
                this.DersListele();
              }
            });
          }
        });
      }




}
