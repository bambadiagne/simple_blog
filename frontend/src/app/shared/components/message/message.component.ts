import { Component, Input, OnInit } from '@angular/core';
import { FunctionalMessage } from '../../models/message-fonctionnel';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  @Input() listeFunctionalMessage: FunctionalMessage[] = [];
  messages: Message[] = [];

  ngOnInit(): void {
    this.messages = this.listeFunctionalMessage.map((message) => {
      return {
        severity: message.type,
        detail: message.message
      };
    });
  }
}
