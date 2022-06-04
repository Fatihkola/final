import { Odev } from './../../models/Odev';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { OdevDialogComponent } from '../dialogs/odev-dialog/odev-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.scss']
})
export class OdevComponent implements OnInit {

    odevler:Odev[];
    displayedColumns=['odevDersAdi','odevKonu', 'islemler'];
    dataSource:any;
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator;
    dialogRef:MatDialogRef<OdevDialogComponent>;
    confirmdialogRef:MatDialogRef<ConfirmDialogComponent>;


      constructor(
        public apiServis:ApiService,
        public matDialog:MatDialog,
        public alert:MyAlertService,
      ) { }

      ngOnInit() {
        this.OdevListele();
      }
      OdevListele(){
        this.apiServis.OdevListe();{
          this.apiServis.OdevListe().subscribe((d:Odev[])=>{
            this.odevler=d;
            //console.log(d);
            this.dataSource=new MatTableDataSource(this.odevler)
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
        var yeniKayit: Odev= new Odev();
        this.dialogRef=this.matDialog.open(OdevDialogComponent,{
          width:'400px',
          data:{
            kayit:yeniKayit,
            islem:'ekle'
          }
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          //console.log(d);
          if(d){
            this.apiServis.OdevEkle(d).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if(s.islem){
                this.OdevListele();
              }
          });
          }
        });

      }

      Duzenle(kayit:Odev){

        this.dialogRef=this.matDialog.open(OdevDialogComponent,{
          width:'400px',
          data:{
            kayit:kayit,
            islem:'duzenle'
          }
        });
        this.dialogRef.afterClosed().subscribe(d=>{
          //console.log(d);
          if(d){
                kayit.odevDersAdi=d.odevDersAdi
                kayit.odevKonu=d.odevKonu;



                this.apiServis.OdevDuzenle(kayit).subscribe((s:Sonuc)=>{
                this.alert.AlertUygula(s);
                });
                }
        });
      }

      Sil(kayit:Odev){
        this.confirmdialogRef=this.matDialog.open(ConfirmDialogComponent,{
          width:'500px'
        });
        this.confirmdialogRef.componentInstance.dialogMesaj=kayit.odevKonu +" adlı konu silinecektir. Onaylıyor musunuz?"

        this.confirmdialogRef.afterClosed().subscribe(d=>{
          if(d){
            this.apiServis.OdevSil(kayit.odevId).subscribe((s:Sonuc)=>{
              this.alert.AlertUygula(s);
              if (s.islem){
                this.OdevListele();
              }
            });
          }
        });
      }



}
