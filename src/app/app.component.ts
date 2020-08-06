import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-test';
  counts: Observable<any> = of([{ value: 0 }]);
  constructor(public firestore: AngularFirestore) {
    this.counts = this.firestore.collection('count').valueChanges({ idField: 'id' });
  }

  async incrementCount(val) {
    await this.firestore.collection('count').doc(val.id).update({ value: val.value + 1 });
  }

  async decrementCount(val) {
    await this.firestore.collection('count').doc(val.id).update({ value: val.value - 1 });
  }
}
