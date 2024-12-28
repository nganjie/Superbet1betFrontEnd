import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from './services/websocket/websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keno-front';

  messages: string[] = [];
  message: any;

  constructor(private websocket:WebsocketService){

  }

  ngOnInit(): void {
    this.websocket.onopen()
  }
  
  
}
