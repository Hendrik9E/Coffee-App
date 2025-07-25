import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Flavour } from 'src/app/models/flavour.model';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  flavours: Flavour[] = [];

  constructor(
    private navCtrl: NavController,
    private dbService: DatabaseService
  ) {}

  async ngOnInit() {
    await this.dbService.initDatabase();
    this.loadFlavours();
  }

  async ionViewWillEnter() {
    this.loadFlavours();
  }

  async loadFlavours() {
    this.flavours = await this.dbService.getAllFlavours();
  }

  onAdd() {
    this.navCtrl.navigateForward('/manage');
  }

  onEdit(flavour: Flavour) {
    localStorage.setItem('editFlavour', JSON.stringify(flavour));
    this.navCtrl.navigateForward('/manage');
  }

  async onDelete(flavour: Flavour) {
    const confirmed = confirm(`Are you sure you want to delete "${flavour.name}"?`);
    if (confirmed && flavour.id) {
      await this.dbService.deleteFlavour(flavour.id);
      this.loadFlavours();
    }
  }

  syncData() {
    alert('Sync completed!');
  }
}
