import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastCtrl: ToastController) { }

  async presentCopiedToast(val?: any): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: `<ion-icon name="copy"></ion-icon> Copied <strong>${val}</strong> to Clipboard!`,
      duration: 2500,
      cssClass: "toast-default",
      position: `middle`
    });
    toast.present();
  }
}
