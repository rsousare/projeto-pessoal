import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../../models/person';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit{

  ELEMENT_DATA: Person[] = []

    displayedColumns: string[] = ['position', 'name', 'weight', 'email', 'area', 'symbol'];
    dataSource = new MatTableDataSource<Person>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PersonService) {}

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
      this.service.findAll().subscribe(resposta => {
        this.ELEMENT_DATA = resposta
        this.dataSource = new MatTableDataSource<Person>(resposta)
        this.dataSource.paginator = this.paginator
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
