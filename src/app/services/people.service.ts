import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { MOCK_PEOPLE } from '../data/mock-people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  getPeople(): Observable<Person[]> {
    return of(MOCK_PEOPLE).pipe(delay(300));
  }
}
