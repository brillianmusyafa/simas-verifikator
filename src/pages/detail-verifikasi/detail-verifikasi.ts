import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';


import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the DetailVerifikasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-detail-verifikasi',
 	templateUrl: 'detail-verifikasi.html',
 })
 export class DetailVerifikasiPage {
 	lat: any;
 	long: any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
 		public geolocation: Geolocation,
 		public camera: Camera) {

 		this.getCurrentLocation();
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad DetailVerifikasiPage');
 	}

 	dismiss() {
 		this.viewCtrl.dismiss();
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

 }
