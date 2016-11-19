import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    button {
      margin-top: 10px;
    }`
  ]
})
export class AppComponent {
  private hexadecimalValue: string = '345d20';

  onSubmit(value) {
    alert(`Submit: ${JSON.stringify(value)}`);
  }
}
