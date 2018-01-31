import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

// modal
import { ModalController } from 'ionic-angular';
import { DetailVerifikasiPage } from '../detail-verifikasi/detail-verifikasi';

import { Api } from '../../providers/providers';

/**
 * Generated class for the ListDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-list-data',
 	templateUrl: 'list-data.html',
 })
 export class ListDataPage {
 	searchQuery: string = '';
 	items: string[];
 	title: string;

 	listdata: any;
 	filteredData: any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController,
 		public api: Api,) {

 	}

 	ionViewDidLoad() {
 		this.getListData();

 		// change title
 		this.changeTitle();
 	}

 	changeTitle(){
 		let id = this.navParams.get('id');
 		if(id == 'pus'){
 			this.title = "PUS";
 		}
 		if(id == 'rtlh'){
 			this.title = "RTLH";
 		}
 		if(id == 'pbdt_rt'){
 			this.title = "PBDT RT";
 		}
 		if(id == 'pbdt_idv'){
 			this.title = "PBDT IDV";
 		}
 		if(id == 'difabel'){
 			this.title = "Difabel";
 		}
 		if(id == 'jamban'){
 			this.title = "Jambanisasi";
 		}
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

 	presetnModal() {
 		let modal = this.modalCtrl.create(DetailVerifikasiPage);
 		modal.present();
 	}
 	dismiss() {
 		this.viewCtrl.dismiss();
 	}

 	getListData(){
 		return new Promise(resolve=>{
 			this.api.get('rab_pkd/pus/3328040018').subscribe(data=>{
 				resolve(data);
 			});
 		}).then(data=>{
 			this.listdata = data;
 			this.filteredData = this.listdata;
 		});
 	}

 }
