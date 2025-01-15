import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../models/project';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{

  ELEMENT_DATA: Project[] = []

    displayedColumns: string[] = ['position', 'name', 'weight', 'endDate', 'area', 'symbol'];
    dataSource = new MatTableDataSource<Project>(this.ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ProjectService) {}

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource<Project>(response)
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
