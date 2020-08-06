import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    public firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.auth.googleSignin().then((res) => {
      this.router.navigate(['/']);
    }).catch((err) => { });
  }

}
