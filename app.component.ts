import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Department } from './department.model';
import { Employee } from './employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-app';
  depts: Department[] = [];
  emps: Employee[] = [];
  filteredEmps: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getDepartments()
      .subscribe((data: Department[]) => {
        this.depts = data;
        console.log(this.depts);
      });

    this.getEmployees('0');
  }

  onChange(id) {
    this.getEmployees(id);
  }

  getEmployees(id: string) {
    this.employeeService.getEmployees(id)
      .subscribe((data: Employee[]) => {
        this.filteredEmps = data;
      });
  }
}
