import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'equitel-shop';
  header:boolean = localStorage.getItem("authenticate")==undefined?false:true;
  constructor(private route: ActivatedRoute){

  }
  ngOnInit(){
    
  }
}
