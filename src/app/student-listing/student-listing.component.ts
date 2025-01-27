import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Student } from './model/student-list.model';
import { StudentListService } from './services/student-list.services';

@Component({
  selector: 'app-student-listing',
  standalone:true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './student-listing.component.html',
  styleUrl: './student-listing.component.css'
})
export class StudentListingComponent {
  dataSource: Student[] = [];
  displayedColumns: string[] = ['name', 'class', 'totalMarks', 'status', 'actions'];
  constructor(private studentService: StudentListService) {
    this.dataSource = this.studentService.getStudent()
  }


  @ViewChild(MatTable) table!: MatTable<Student>;

  addData() {
    // const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    // this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    // this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}


