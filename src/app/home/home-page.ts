import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home-page.',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  flavours = [
    {
      ID: 1,
      Name: 'RISTRETTO',
      Barcode: '5449000011115',
    },
    {
      ID: 2,
      Name: 'RISTRETTO INTENSO',
      Barcode: '5449000011116',
    }
  ];

  constructor(private navCtrl: NavController) {}

  onAdd() {
  this.navCtrl.navigateForward('/manage');
}
  ngOnInit() {
  }

  syncData() {
    alert('Sync completed!');
  }
}
