import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  sendMessage(message: string) {
      console.log("Message sent from service");
      this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  onMessage(): Observable<any> {
    console.log("Message received from service");
    return this.subject.asObservable();
  }
  
}
