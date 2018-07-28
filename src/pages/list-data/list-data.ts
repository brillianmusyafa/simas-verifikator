import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

// modal
import { ModalController, ToastController } from 'ionic-angular';
import { DetailVerifikasiPage } from '../detail-verifikasi/detail-verifikasi';
import { DataPbdtIdvPage } from '../data-pbdt-idv/data-pbdt-idv';
import { DataPbdtRtPage } from '../data-pbdt-rt/data-pbdt-rt';
import { DinsosJknPage } from '../dinsos-jkn/dinsos-jkn';

import { Storage } from '@ionic/storage';
import { Api } from '../../providers/providers';

/**
 * Generated class for the ListDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-list-data',
 	templateUrl: 'list-data.html',
 })
 export class ListDataPage {
 	searchQuery: string = '';
 	items: string[];
 	title: string;
 	table: string;

 	listdata: any;
 	filteredData: any;

 	loader: any;

 	page_id: any;
 	url:any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController,
 		public api: Api,
 		public storage: Storage,
 		public toastCtrl: ToastController,
 		public loadingCtrl: LoadingController) {
 		// get id page
 		this.page_id = this.navParams.get('id');
 	}

 	ionViewDidLoad() {
 		this.presentLoading();
 		this.getListData();

 		// change title
 		this.changeTitle();
 	}

 	presentLoading(){
     this.loader = this.loadingCtrl.create({
       content: "Mengambil data ...",
     });

     this.loader.present();
   }

 	changeTitle(){
 		let id = this.navParams.get('id');
 		if(id == 'aps'){
 			this.title = "Anak Putus Sekolah";
 			this.table = 'idv';
 		}
 		if(id == 'rtlh'){
 			this.title = "RTLH";
 			this.table = 'rt';
 		}
 		if(id == 'pbdt_rt'){
 			this.title = "PBDT RT";
 			this.table = 'rt';
 		}
 		if(id == 'pbdt_idv'){
 			this.title = "PBDT IDV";
 			this.table = 'idv';
 		}
 		if(id == 'difabel'){
 			this.title = "Difabel";
 			this.table = 'idv';
 		}
 		if(id == 'odf'){
 			this.title = "Jambanisasi";
 			this.table = 'rt';
 		}

 		if(id == 'dinsos_jkn_apbn' || id=='dinsos_jkn_apbd1' || id=='dinsos_jkn_apbd2'){
 			this.title = "JKN Dinsos";
 			this.table = 'dinsos_jkn';
 			console.log('a ');
 		}

 		console.log(this.table);
 	}

 	getItems(ev: any) {
 		// Reset items back to all of the items
 		this.listdata = this.filteredData;

 		// set val to the value of the searchbar
 		let val = ev.target.value;

 		// if the value is an empty string don't filter the items
 		if (val && val.trim() != '') {
 			this.listdata = this.listdata.filter((item) => {
 				return (item.nama.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.alamat.toLowerCase().indexOf(val.toLowerCase()) > -1);
 			})
 		}
 	}

 	presetnModal(item) {
 		let modal = this.modalCtrl.create(DetailVerifikasiPage,{data: item});
 		modal.present();
 	}
 	dismiss() {
 		this.viewCtrl.dismiss();
 	}

 	// goToDetail(item){
 	// 	this.navCtrl.push(DetailVerifikasiPage,{data:item});
 	// }

 	goToDetail(item){
 		console.log(this.table);
 		if(this.table=='rt'){
 			this.navCtrl.push(DataPbdtRtPage,{data:item});
 		}
 		if(this.table=='idv'){
 			this.navCtrl.push(DataPbdtIdvPage,{data:item});
 		}
 		if(this.table=='dinsos_jkn'){
 			this.navCtrl.push(DinsosJknPage,{data:item});
 		}

 	}

 	getListData(){
 		let kel_id:any;
 		this.storage.get('userlogin').then((val)=>{
 			// kelurahan_id
 			console.log('get user login');
 			if(val.auth.role_id == "1" || val.auth.role_id == "2"){
 				this.storage.get('_settings').then((res)=>{
 					kel_id = res.kelurahan;
 					this._getListData(kel_id);
 				});
 			}
 			else{
 				kel_id = val.user.kelurahan_id;
 				this._getListData(kel_id);
 			} 			
 		});
 	}

 	_getListData(kel_id){
 		this.api.get('rab_pkd/'+this.page_id+'/'+kel_id).subscribe((data)=>{
 				this.listdata = data;
 				this.filteredData = this.listdata;
 				this.loader.dismiss();
 			},(error)=>{
 				console.log(error);
 				let toast = this.toastCtrl.create({
 					message: 'Error Jaringan, mohon cek koneksi Anda.',
 					duration: 5000,
 					position: 'bottom'
 				});
 				this.loader.dismiss();
 				toast.present();
 			});
 	}

 }
