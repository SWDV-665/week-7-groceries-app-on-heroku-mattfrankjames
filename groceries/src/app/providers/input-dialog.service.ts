import { Injectable } from '@angular/core';
import { GroceriesServiceService } from '../providers/groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item..." : 'Add an item to the grocery list',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'name',
          value: item ? item.name : null,
        },
        {
          name: 'quantity',
          type: 'text',
          id: 'quantity-id',
          placeholder: 'quantity',
          value: item ? item.quantity : null,
          attributes: {
            inputmode: 'tel',
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: item ? 'Save Changes' : 'Add Item',
          handler: data => {
            console.log('Confirm Ok', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(data)
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
