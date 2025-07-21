import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-screen',
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginScreenPage {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.navCtrl.navigateRoot('/home');
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Invalid username or password',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
