import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex justify-content-center">
      <p-progressSpinner aria-label="Loading"></p-progressSpinner>
    </div>
  `
})
export class LoadingSpinnerComponent {

}
