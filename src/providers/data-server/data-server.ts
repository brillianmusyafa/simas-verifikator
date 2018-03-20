import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServerProvider {

  constructor(public http: HttpClient, public api:Api, public storage: Storage) {
    console.log('Hello DataServerProvider Provider');
  }

  getData(){
  	this.storage.get('userlogin').then((res)=>{
  		this.api.get('home?kel_id='+res.kelurahan.id);
  	});

  	
  }

}
