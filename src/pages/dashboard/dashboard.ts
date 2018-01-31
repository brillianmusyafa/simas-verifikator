import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ListDataPage } from '../list-data/list-data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToPage(param1,param2){
  	this.navCtrl.push(ListDataPage,{
      id: param2
    });
  }

}
