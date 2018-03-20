import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/*
  Generated class for the DataLokalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class DataLokalProvider {
  	
  	constructor(public http: HttpClient, public nativestorage: NativeStorage, public storage: Storage, public events: Events) {
  		console.log('Hello DataLokalProvider Provider');
  	}

  	set_login(data){
  		this.storage.set('userlogin',data).then((res)=>{
  			if(res){
  				// this.user.name = res.auth.name;
  				// this.user = {
  				// 	name: res.auth.name,
  				// 	kecamatan: res.user.kecamatan.kec_name,
  				// 	kelurahan: res.user.kelurahan.kel_name,
  				// 	kecamatan_id: res.user.kecamatan.id,
  				// 	kelurahan_id: res.user.kelurahan.id
  				// };

  				this.events.publish('user:created', res, Date.now());
  			}
  		});
  	}

  	clearData(){
  		this.storage.clear().then((resp)=>{
  			console.log('all data berhasil di clear');
  		});
  	}

  }
