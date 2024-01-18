import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-content-center">
      <p-progressSpinner aria-label="Loading"></p-progressSpinner>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

}
