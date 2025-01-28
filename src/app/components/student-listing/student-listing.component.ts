import { Component, inject, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from "../header/header.component";
import { GradePipe } from "./pipes/grade.pipe";
import { StatusPipe } from "./pipes/status.pipe";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { RouterLink} from '@angular/router';
import { Student } from '../../model/student-list.model';
import { StudentListService } from '../../services/student-list.services';


@Component({
  selector: 'app-student-listing',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatCheckboxModule, HeaderComponent, GradePipe, StatusPipe,RouterLink],
  templateUrl: './student-listing.component.html',
  styleUrl: './student-listing.component.css'
})
export class StudentListingComponent {
  dataSource: Student[] = [];
  displayedColumns: string[] = ['select', 'name', 'class', 'totalMarks', 'status', 'actions'];
  selection = new SelectionModel<Student>(true, []);

  constructor(private studentService: StudentListService) {
    this.dataSource = this.studentService.getStudent()
  }
  readonly dialog = inject(MatDialog);

  openDialog(userName: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { user: userName },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result === 'confirm') {
        this.removeData()
      }
    });
  }

  @ViewChild(MatTable) table!: MatTable<Student>;

  addData() {
    // const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    // this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    // this.table.renderRows();
  }


  removeData() {
    const selectedIds = new Set(this.selection.selected.map(item => item.id));
    this.dataSource = this.dataSource.filter(item => !selectedIds.has(item.id));
    this.selection.clear();
    this.table?.renderRows();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource);
  }

  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}


