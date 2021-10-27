import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../providers/groceries-service.service';
import { InputDialogService } from '../providers/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery";
  items: any = [];
  errorMessage: string;
  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems()
    })
    this.loadItems()
   }
  //  ionViewDidLoad() {
  //    this.loadItems();
  //  }
  loadItems() {
    this.dataService.getItems().subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error
    );
  }
  async removeItem(id) {
    this.dataService.removeItem(id);
  }
  async shareItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 2000
    });
    toast.present();
    let message = `Grocery Item - Name: ${item.name} - Quantity: ${item.quantity}`;
    let subject = `Shared via Groceries app`;

    this.socialSharing.share(message, subject).then(() => {
      console.log('Shared successfully');
    }).catch((error) => {
      console.error(`Error when sharing - ${error}.`);
    });
  }
  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 2000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }
  // waiting to see if we can lose this method and just use the showAddItemPropmt()
  addItem() {
    console.log('adding item');
    this.inputDialogService.showPrompt();
  }


}
