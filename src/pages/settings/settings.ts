import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Events,LoadingController } from 'ionic-angular';

import { Settings } from '../../providers/providers';
import { User,Api } from '../../providers/providers';

import { Storage } from '@ionic/storage';
/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
 @IonicPage()
 @Component({
   selector: 'page-settings',
   templateUrl: 'settings.html'
 })
 export class SettingsPage {
   loader: any;

   list_kecamatan: any;
   list_desa: any;
   kecamatan:any = null;
   kelurahan:any = null;

   role_id:any;

   constructor(public navCtrl: NavController,
     public settings: Settings,
     public formBuilder: FormBuilder,
     public navParams: NavParams,
     public api: Api,
     public ev: Events,
     public loadingCtrl: LoadingController,
     public storage: Storage,
     public translate: TranslateService) {

     this.getDataKecamatan().then(data=>{
       this.list_kecamatan = data;

       this.storage.get('_settings').then((val)=>{
         if(val.kecamatan){
           this.kecamatan = val.kecamatan; 
           this.update(this.kecamatan);
         }
       });
     });

   }

   ionViewDidLoad() {

     this.storage.get('userlogin').then((val)=>{
       this.role_id = val.auth.role_id;
       if(val.auth.role_id == '2'){
         this.kecamatan = val.user.kecamatan.id;
         this.storage.set('_settings',{kecamatan:this.kecamatan});
         this.update(this.kecamatan);
       }
     });
   }

   ngOnChanges() {
     console.log('Ng All Changes');
   }


   getDataKecamatan(){
     return new Promise(resolve =>{
       this.api.get('kecamatan').subscribe(data=>{
         resolve(data);
       });
     });
   }

   getDataDesa(kec_id){
     let loader = this.loadingCtrl.create({
       content: "Mengambil data Wilayah ...",
     });

     loader.present();
       return new Promise(resolve =>{
         this.api.get('desa/'+kec_id).subscribe(data=>{
           resolve(data);
         });
       }).then(data=>{
         this.list_desa = data;
         this.storage.get('_settings').then((val)=>{
           if(val.kelurahan){
             this.kelurahan = val.kelurahan;
           }
           loader.dismiss();
         });
       });
     }

     update(event: any){
       console.log(event);
       this.getDataDesa(event);

       this.storage.get('_settings').then((val)=>{
         let setting_data = val;
         // setting_data.kecamatan = event;
         this.storage.set('_settings',setting_data);
       });
     } 

     saveSetting(event: any){
       this.storage.get('_settings').then((val)=>{
         let setting_data = val;
         setting_data.kelurahan = event;
         this.storage.set('_settings',setting_data);
       });

       this.storage.get('userlogin').then((val)=>{
         let userlogin = val;
         userlogin.kelurahan = event;


         // update
         this.storage.set('userlogin',userlogin).then((data)=>{
           // publish event update setting
           this.ev.publish('user:update',data, Date.now());
         });
       });
     }
   }
