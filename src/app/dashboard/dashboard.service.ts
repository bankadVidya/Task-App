import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from './Model/tasks';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

   postDataURL='https://jira-task-app-default-rtdb.firebaseio.com/tasks.json';
   DeleteAllURL=`https://jira-task-app-default-rtdb.firebaseio.com/tasks.json`;
   fetchDataURL=`https://jira-task-app-default-rtdb.firebaseio.com/tasks.json`;
   

    postData(e:any){
    return this.http.post(this.postDataURL,e);
   }

   deleteTaskFromService(id:any){
    const DeleteURL=`https://jira-task-app-default-rtdb.firebaseio.com/tasks/${id}.json`;
   return this.http.delete(DeleteURL);
   }
   deleteAllTasksFromService(){
   return this.http.delete(this.DeleteAllURL);
   }

   fetchDataFromService(){
   return this.http
    .get<{ [key: string]: Tasks }>(
      'https://jira-task-app-default-rtdb.firebaseio.com/tasks.json'
    )
    .pipe(
      map((response) => {
        let tasksArray = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            tasksArray.push({ ...response[key], id: key });
          }
        }
        return tasksArray;
      })
    )
   }

   UpdateTask(data: any, id: any){
    console.log(
    "from service id", id
    )
      return this.http.put('https://jira-task-app-default-rtdb.firebaseio.com/tasks/'+id+'.json',data);
   }
}

