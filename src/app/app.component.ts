import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public hexadecimalValue: string;

  public dropdownValue: string = '';

  onSubmit(value) {
    alert(`Submit: ${JSON.stringify(value)}`);
  }
}
