import { Odev } from './../../../models/Odev';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.scss']
})
export class OdevDialogComponent implements OnInit {

    dialogBaslik:string;
    islem:string;
    frm:FormGroup;
    yeniKayit:Odev;


      constructor(
        //public matDialog:MatDialog,
        public frmBuild:FormBuilder,
        public dialogRef:MatDialogRef<OdevDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any
      ) {
        this.islem=data.islem;
        this.yeniKayit=data.kayit;
        if(this.islem=='ekle'){
          this.dialogBaslik="Ödev Ekle";
        }
        if(this.islem=='duzenle'){
          this.dialogBaslik="Ödev Düzenle";
        }
        this.frm=this.FormOlustur();
       }

      ngOnInit() {
      }
      FormOlustur(){
        return this.frmBuild.group({
          ogrNo:[this.yeniKayit.odevDersAdi],
          ogrAdsoyad:[this.yeniKayit.odevKonu],

        });
      }


    }
