import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ListDataPage } from '../list-data/list-data';

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
   loader: any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public dataserver: DataServerProvider, 
     public api: Api,
     public loadingCtrl: LoadingController) {
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad DashboardPage');
     this.presentLoading();
     this.storage.get('userlogin').then((res)=>{
       this.api.get('home?kel_id='+res.kelurahan.id).subscribe((val)=>{
         this.data = val;

         this.loader.dismiss();
       });
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

 }
