import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tasks } from './Model/tasks';
import { DashboardService } from './dashboard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InterceptorService } from './loader/interceptor.service';
import { LoadingBarService } from './loader/loading-bar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, CommonModule, HttpClientModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  showPopUp: boolean = false;
  http: HttpClient = inject(HttpClient);
  TaskCardData: any = [];
  cardData: any;
  editflag: boolean = false;
  currentTaskId: string;
  searchTxt='';
  filteredData=[];

  constructor(
    private dashboardService: DashboardService,
    public loadingservice: LoadingBarService
  ) {}

  ngOnInit() {
    this.fetchData();
  }
  openPopup() {
    this.editflag = false;
    this.showPopUp = !this.showPopUp;
    // this.selectedTask={title:'',}
  }
  chck(e: any) {
    console.log('form flag in parent component', e);

    this.fetchData();

    this.showPopUp = e;
  }
  createOrUpdate(e: any) {
    if (this.editflag) {
      console.log('data is ', e, 'id is ', this.currentTaskId);
      this.dashboardService
        .UpdateTask(e, this.currentTaskId)
        .subscribe((response) => {
          console.log('update task response ', response);
        });

        setTimeout(() => {
          this.fetchData();

        }, 1000);
    } else {
      console.log('form data in parent component', e);
      this.dashboardService.postData(e).subscribe((response) => {
        console.log('response inside subscriber', response);
      });

      setTimeout(() => {
        this.fetchData();

      }, 1000);
    }
  }

  //keeping it private as only dashboard component should be able to use it
  //in order to convert your daata into an array you make use of RXJS and to use it use pipe
  private fetchData() {
    this.dashboardService.fetchDataFromService().subscribe((taskArrData) => {
      this.TaskCardData = taskArrData;
      this.filteredData=this.TaskCardData;
      console.log('data  from db converted to array using rxjs ', taskArrData);
      console.log('taskarray data', this.TaskCardData);
    });
  }

  deleteTask(id: any) {
    this.dashboardService.deleteTaskFromService(id).subscribe((response) => {
      console.log(response);
    });

    setTimeout(() => {
      this.fetchData();

    }, 1000);
  }

  deleteAllTasks() {
    this.dashboardService.deleteAllTasksFromService().subscribe((response) => {
      console.log('delete', response);
    });

    setTimeout(() => {
      this.fetchData();

    }, 1000);
  }

  editTask(task: any) {
    this.showPopUp = !this.showPopUp;
    this.cardData = task;
    this.editflag = true;
    this.currentTaskId = task.id;
  }

  onKeyup(){
    console.log(this.searchTxt);

    if(!this.searchTxt){
      this.filteredData=this.TaskCardData;
      return;
    }
    this.filteredData= this.TaskCardData.filter(task=>
      task.assignedTo.toLowerCase().includes(this.searchTxt.toLowerCase()) ||
      task.title.toLowerCase().includes(this.searchTxt.toLowerCase())
    )
  }
}
