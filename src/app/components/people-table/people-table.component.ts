import { Component, inject, signal, viewChild, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './people-table.component.html',
  styleUrl: './people-table.component.scss',
})
export class PeopleTableComponent implements OnInit {
  private peopleService = inject(PeopleService);

  displayedColumns = ['firstName', 'lastName', 'dateOfBirth', 'title', 'phoneNumber'];
  dataSource = new MatTableDataSource<Person>();
  loading = signal(true);
  filterText = signal('');

  sort = viewChild(MatSort);

  constructor() {
    effect(() => {
      const sortRef = this.sort();
      if (sortRef) {
        this.dataSource.sort = sortRef;
      }
    });
  }

  ngOnInit() {
    this.getPeopleList();
  }

  async getPeopleList() {
    try {
      const peopleList = await firstValueFrom(this.peopleService.getPeople());
      this.dataSource.data = peopleList;
    } catch (error) {
      console.error('Error fetching people list:', error);
    } finally {
      this.loading.set(false);
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText.set(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
