import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User,Api } from '../../providers/providers';

import { MainPage } from '../pages';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string, no_telp: string, instansi: string, role:string, kecamatan: string, desa: string } = {
    name: '',
    email: '',
    password: '',
    no_telp: '',
    instansi: '',
    role: '',
    kecamatan: '',
    desa: '',
  };

  // Our translated text strings
  private signupErrorString: string;

  list_kecamatan: any;
  list_desa: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api: Api ) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.getDataKecamatan().then(data=>{
      this.list_kecamatan = data;
      console.log(this.list_kecamatan);
    });
  }

  ionViewDidLoad(){
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  getDataKecamatan(){
    return new Promise(resolve =>{
      this.api.get('kecamatan').subscribe(data=>{
        resolve(data);
      });
    });
  }

  getDataDesa(kec_id){
    return new Promise(resolve =>{
      this.api.get('desa/'+kec_id).subscribe(data=>{
        resolve(data);
        console.log(data);
      });
    }).then(data=>{
      this.list_desa = data;
    });
  }

  update(event: any){
    console.log(event);
    this.getDataDesa(event);
  } 
}
