import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';
import { Api } from '../../providers/providers';

/**
 * Generated class for the DataPbdtIdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-dinsos-jkn',
 	templateUrl: 'dinsos-jkn.html',
 })
 export class DinsosJknPage {
 	semua_indikator:string = 'umum';
 	lat: any;
 	long: any;
 	data: {
 		nama:string,
 		alamat:string,
 		nik:string,
 		no_kk:string,
 		jenis_kelamin:string,
 		umur_saat_pendataan:string,
 		status_verifikasi: string,
 		status_sekolah:string
 	} = {
 		nama:'',
 		alamat:'',
 		nik:'',
 		no_kk:'',
 		jenis_kelamin:'',
 		umur_saat_pendataan:'',
 		status_verifikasi:'',
 		status_sekolah:''
 	};
 	formverifikasi: {};

 	master_data:any = [];


 	btn_verifikasi: boolean = true;
 	btn_upload:boolean = true;
 	btn_simpan:boolean = true;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
 		public geolocation: Geolocation,
 		public storage: Storage,
 		public alertCtrl: AlertController,
 		public camera: Camera) {
 		this.data = this.navParams.get('data');

 		// set to dropdown form
 		this.setFormDropdown();
 		this.getCurrentLocation();
 		// console.log(this.md);
 	}

 	ionViewDidLoad() {
 		console.log(this.master_data);
 		console.log('ionViewDidLoad DetailVerifikasiPage');
 	}

 	dismiss() {
 		this.viewCtrl.dismiss();
 	}

 	setValueForm(){

 	}

 	updateData(){
 		let alert = this.alertCtrl.create({
 			title: 'Informasi',
 			subTitle: 'Data Berhasil disimpan. Jangan lupa untuk upload foto.',
 			buttons: ['Ok']
 		});
 		alert.present();
 		this.btn_verifikasi = false;
 	}


 	saveUpload(){
 		let alert = this.alertCtrl.create({
 			title: 'Informasi',
 			subTitle: 'Data Foto Berhasil disimpan. Terima Kasih',
 			buttons: ['Ok']
 		});
 		alert.present();

 		this.btn_upload = false;
 	}

 	getCurrentLocation(){
 		// this.location = {lat:10};
 		// this.location.long = {long:20};

 		this.geolocation.getCurrentPosition().then((resp) => {
 			// resp.coords.latitude
 			// resp.coords.longitude
 			console.log(resp);
 			this.lat = resp.coords.latitude;
 			this.long = resp.coords.longitude;
 		}).catch((error) => {
 			console.log('Error getting location', error);
 		});
 	}

 	openCamera(){
 		const options: CameraOptions = {
 			quality: 100,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			encodingType: this.camera.EncodingType.JPEG,
 			mediaType: this.camera.MediaType.PICTURE
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			// imageData is either a base64 encoded string or a file URI
 			// If it's base64:
 			let base64Image = 'data:image/jpeg;base64,' + imageData;
 			console.log(base64Image);
 		}, (err) => {
 			// Handle error
 		});
 	}


 	setFormDropdown(){
 		let that = this;
 		this.storage.get('master_data').then((resp)=>{
 			// this.master_data = resp;
 			that.master_data.push(resp);
 		});
 	}

 	kembali(link){
 		this.navCtrl.setRoot(DashboardPage);
 	}

 	simpan(){
 		let alert = this.alertCtrl.create({
 			title: 'Informasi',
 			subTitle: 'Data Berhasil diverifikasi.',
 			buttons: ['Ok']
 		});
 		alert.present();
 		this.btn_simpan = false;
 	}
 }
