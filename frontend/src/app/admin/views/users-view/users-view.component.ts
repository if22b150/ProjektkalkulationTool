import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {AResourceView} from "../a-resource-view";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent extends AResourceView<User>{
  constructor(public userService: UserService) {
    super(userService)
  }
}
