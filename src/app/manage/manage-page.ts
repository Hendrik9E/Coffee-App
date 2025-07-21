import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  standalone: true,
  selector: 'app-manage-page',
  templateUrl: './manage-page.html',
  styleUrls: ['./manage-page.scss'],
  providers: [BarcodeScanner],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ManagePage {
  barcode: string = '';
  name: string = '';
  pricePerBox: number | null = null;
  pricePerPod: number | null = null;
  podsPerBox: number | null = null;

  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner
  ) {}

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  onAdd() {
    console.log('Add flavour:', {
      barcode: this.barcode,
      name: this.name,
      pricePerBox: this.pricePerBox,
      pricePerPod: this.pricePerPod,
      podsPerBox: this.podsPerBox,
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home'); // Adjust route if needed
  }
}
