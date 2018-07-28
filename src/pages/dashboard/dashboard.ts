import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';

import { ListDataPage } from '../list-data/list-data';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { DataServerProvider } from '../../providers/data-server/data-server';
import { Api} from '../../providers/api/api';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
   selector: 'page-dashboard',
   templateUrl: 'dashboard.html',
 })
 export class DashboardPage {
   data:any;
   slider:any;
   loader: any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public dataserver: DataServerProvider, 
     public api: Api,
     public sanitizer: DomSanitizer,
     public events: Events,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController) {
     // get master data
     this.saveMasterDataToStorage();

     // event update setting
     this.events.subscribe('user:update',(res,time)=>{
       this.api.get('home?kel_id='+res.kelurahan).subscribe((val)=>{
         this.data = val;
       });
     });

     // use setting
     this.storage.get('_settings').then((res)=>{

       if(res!==null){
         this.api.get('home?kel_id='+res.kelurahan).subscribe((val)=>{
           this.data = val;
           console.log(this.data);
         });
       }
       else{
         let alert = this.alertCtrl.create({
           title: 'Informasi',
           subTitle: 'Mohon isi wilayah di setting untuk menampilkan data.',
           buttons: ['Ok']
         });
         alert.present();
       }
     });
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad DashboardPage');
     this.presentLoading();
     this.loadSlider();

     this.storage.get('userlogin').then((res)=>{
       // admin

       if(res.auth.role_id==1 || res.auth.role_id== 2){
         this.data = null;
         console.log('user admin');
       }
       else{
         this.api.get('home?kel_id='+res.kelurahan.id).subscribe((val)=>{
           this.data = val;
         });
       }
       this.loader.dismiss();
     });
   }

   goToPage(param1,param2){
     this.navCtrl.push(ListDataPage,{
       id: param2
     });
   }

   presentLoading(){
     this.loader = this.loadingCtrl.create({
       content: "Mengambil data ...",
     });

     this.loader.present();
   }

   loadSlider(){
     this.storage.get('slider').then((val)=>{
       console.log('load slider');
       this.slider = val;
     });
   }

   getBackground(image){
     return this.sanitizer.bypassSecurityTrustStyle('url('+this.api.url_host+image+')');
   }

   saveMasterDataToStorage(){
     // save sekali saja kemudian simpan di local storage
     this.storage.get('master_data').then((hasil)=>{
       if(hasil == null){
         this.api.get('master_data').subscribe((all_master_data)=>{
           this.storage.set('master_data',all_master_data);
         });
       }
       else{
         console.log(hasil);
       }
     });
   }

 }
