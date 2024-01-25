import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-delete-user',
  template: `
    <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
  `,
  styles: []
})
export class DeleteUserComponent {
  @Input() user: User;
  loading: boolean;

  constructor(private userService: UserService) {
  }

  delete() {
    this.loading = true;
    this.userService.delete(this.user.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.userService.getAll();
        }
      })
  }
}
