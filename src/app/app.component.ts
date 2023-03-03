import { Component, OnInit } from '@angular/core';
import { Todos } from './app.service';
import {v4} from "uuid";
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'todo-application';
  newTodo:string;
  faTrashAlt = faTrashAlt;    
  todoData = localStorage.getItem("todoStorage");
  todoStorage:Todos[];

  constructor(){
    if (this.todoData === null) {
        this.todoStorage = [];
        
    }else{
        this.todoStorage = JSON.parse(this.todoData);
      
    }  
  }
  
  ngOnInit(): void {}

  addTodo(){

    if (this.newTodo){
      let todo = new Todos();
      todo.id = v4();
      todo.title = this.newTodo;
      todo.date = new Date();
      todo.isChecked = false;      
      this.newTodo = "";

      if (this.todoData === null) {
          this.todoStorage = [];          
          this.todoStorage.push(todo);
      }else{               
        this.todoStorage.push(todo);           
      }       
      
    }else{
      alert("PLEASE ENTER ANY TODO");
    }

  }

  saveTodo(){    
    localStorage.setItem("todoStorage",JSON.stringify(this.todoStorage));
  }

  clearAll(){    
    this.todoStorage = [];
  }

  onChangeStatus(todo:Todos){
    todo.isChecked = !todo.isChecked;    
  }

  deleteTodo(todo:Todos){
    const indexOfTodo = this.todoStorage.findIndex( (currentTodo) => 
    currentTodo.id === todo.id      
    )   
    this.todoStorage.splice(indexOfTodo,1);    
  }

}
