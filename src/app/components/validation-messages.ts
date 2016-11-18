import {Component, Input} from '@angular/core';

@Component({
  selector: 'validation-messages',
  template: `
    <div class="requirements">
      <div *ngFor="let message of messages">{{message}}</div>
    </div>
  `,
  styles: [`
    .requirements {
      color: #999;
      transition: 0.28s;
      margin-left: 12px;
    }`
  ]
})
export class ValidationMessagesComponent {
  @Input() messages: Array<string>;
}