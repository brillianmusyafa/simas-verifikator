import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { User } from '../../providers/providers';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';
import { DataLokalProvider } from '../../providers/data-lokal/data-lokal';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'brillianinfo@gmail.com',
    password: 'bismillah'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public datalokal: DataLokalProvider,
    public http: Http,
    public menu: MenuController,
    public translateService: TranslateService) {
    // set menu disable
    this.menu.enable(false);

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.post("http://simas.tegalkab.go.id/mobile/login", this.account, options)
    .subscribe(data => {
      let res = data.json();
      let toast = this.toastCtrl.create({
          message: res.msg,
          duration: 3000,
          position: 'bottom'
        });

      toast.present();

      if(res.status == 200){
        // set local datalokal
        this.checkAuthLogin(res);

        // set menu enable
        this.menu.enable(true);
        this.navCtrl.setRoot(DashboardPage);
      }
    }, error => {
      console.log('error');
      console.log( JSON.stringify(error));// Error getting the data
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
  }



  goTo(){
    this.navCtrl.push(SignupPage);
  }


  checkAuthLogin(resp){
    if(resp.status == 200){
      // login ok
      this.datalokal.set_login(resp);

      return true;
    }
  }
}
