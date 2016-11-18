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
  private registrationCode: string = 'DEADBEEF';

  onSubmit(value) {
    alert(`Submit: ${JSON.stringify(value)}`);
  }
}
