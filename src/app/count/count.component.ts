import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {

  title = 'firebase-test';
  counts: Observable<any> = of([{ value: 0 }]);
  user: User;
  constructor(
    public firestore: AngularFirestore,
    public auth: AuthService,
    private router: Router,
  ) {
    this.auth.user$.subscribe((res) => {
      this.user = res;
      if (this.user) {
        this.counts = this.firestore.collection('count').doc(res.uid).valueChanges();
      }
    });

  }

  ngOnInit() {

  }

  incrementCount() {
    const listener = this.counts.subscribe(async (res) => {
      listener.unsubscribe();
      await this.firestore.collection('count').doc(this.user.uid).update({ value: res.value + 1 });
    });
  }

  decrementCount() {
    const listener = this.counts.subscribe(async (res) => {
      listener.unsubscribe();
      await this.firestore.collection('count').doc(this.user.uid).update({ value: res.value - 1 });
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }

}
