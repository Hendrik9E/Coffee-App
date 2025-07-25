import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service'; 
import { Flavour } from 'src/app/models/flavour.model'

@Component({
  standalone: true,
  selector: 'app-manage-page',
  templateUrl: './manage-page.html',
  styleUrls: ['./manage-page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ManagePage {
  barcode: string = '';
  name: string = '';
  pricePerBox: number | null = null;
  pricePerPod: number | null = null;
  podsPerBox: number | null = null;
  photoName: string = '';
  photoData: string = ''; 
  isEditMode: boolean = false; 
  editingId: number | null = null;

  constructor(
    private navCtrl: NavController,
    private dbService: DatabaseService
  ) {}

  async onAdd() {
    if (!this.barcode || !this.name || !this.pricePerBox || !this.pricePerPod || !this.podsPerBox ) {
      alert('Please complete all fields and take a photo.');
      return;
    }

    try {
      await this.dbService.addFlavour({
        barcode: this.barcode,
        name: this.name,
        pricePerBox: this.pricePerBox,
        pricePerPod: this.pricePerPod,
        podsPerBox: this.podsPerBox,
        photoName: this.photoName
      });

      alert('Flavour saved successfully!');
      this.clearForm();

      this.navCtrl.navigateBack('/home');
      
    } catch (error) {
      console.error('Error saving flavour:', error);
      alert('Failed to save flavour.');
    }
  }

  clearForm() {
    this.barcode = '';
    this.name = '';
    this.pricePerBox = null;
    this.pricePerPod = null;
    this.podsPerBox = null;
    this.photoName = '';
    this.photoData = '';
  }

  loadFlavourToEdit(flavour: Flavour) {
    this.editingId = flavour.id!;
    this.barcode = flavour.barcode;
    this.name = flavour.name;
    this.pricePerBox = flavour.pricePerBox;
    this.pricePerPod = flavour.pricePerPod;
    this.podsPerBox = flavour.podsPerBox;
    this.photoName = flavour.photoName;
    this.photoData = '';
    this.isEditMode = true;
  }

  ngOnInit() {
    const saved = localStorage.getItem('editFlavour');
    if (saved) {
      const flavour = JSON.parse(saved);
      this.loadFlavourToEdit(flavour);
      localStorage.removeItem('editFlavour');
    }
  }

  async onUpdate() {
    if (!this.barcode || !this.name || !this.pricePerBox || !this.pricePerPod || !this.podsPerBox) {
      alert('Please fill all field');
      return;
    }

    if (this.editingId === null) {
      alert('No item selected to update.');
      return;
    }

    try {
      await this.dbService.updateFlavour(this.editingId, {
        barcode: this.barcode,
        name: this.name,
        pricePerBox: this.pricePerBox,
        pricePerPod: this.pricePerPod,
        podsPerBox: this.podsPerBox,
        photoName: this.photoName
      });

      alert('Flavour updated successfully!');
      this.navCtrl.navigateBack('/home');

    } catch (error) {
      console.error('Error updating flavour:', error);
      alert('Failed to update flavour.');
    }
  }

  scanBarcode() {
    console.log('Mock barcode scan in browser');
  }

  takePhoto() {
    console.log('Mock camera photo in browser');
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}
