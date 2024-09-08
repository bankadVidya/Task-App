import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Tasks } from '../Model/tasks';
import { CommonModule } from '@angular/common';
import { LoadingBarService } from '../loader/loading-bar.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit, AfterViewInit {
  constructor(private router: Router,
    public loadingservice: LoadingBarService
  ) {}

  http: HttpClient = inject(HttpClient);

  @ViewChild('taskForm') taskForm: NgForm;
  @ViewChild('taskForm') taskFormP: NgForm;
  @Output() event = new EventEmitter<boolean>();
  @Output() formData = new EventEmitter<Object>();
  @Input() editData: any;
  @Input() Editflag: any;
 

  flag: boolean = false;
  editFlag: any;

  ngOnInit() {
    this.editFlag = this.Editflag;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.editFlag && this.editData && this.taskForm) {
        console.log('editFlag:', this.editFlag);
        console.log('editData:', this.editData);
        console.log('Form before patchValue:', this.taskForm.form.value);
        console.log('form', this.taskForm);

        this.taskForm.form.patchValue({
          assignedTo: this.editData.assignedTo,
          date: this.editData.date,
          des: this.editData.des,
          priority: this.editData.priority,
          status: this.editData.status,
          title: this.editData.title,
        });

        console.log('Form after patchValue:', this.taskForm.form.value);
      } else {
        console.error('Form not initialized or missing editData!');
      }
    }, 0);
  }

  closePopup() {
    this.router.navigateByUrl('dashboard');
    this.event.emit(false);
  }

  submitForm(taskForm: NgForm) {
    this.flag = true;
    console.log('form', taskForm.value);
    this.formData.emit(taskForm.value);
    this.router.navigateByUrl('dashboard');
    this.event.emit(false);
  }
}
