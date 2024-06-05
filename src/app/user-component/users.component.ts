import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../entities/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  public userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  toggleBan(user: UserModel): void {
    if (user.banned) {
      this.userService.unbanUser(user).subscribe(() => {
        console.log('User unbanned successfully:', user.username);
        user.banned = false;
      });
    } else {
      this.userService.banUser(user).subscribe(() => {
        console.log('User banned successfully:', user.username);
        user.banned = true;
      });
    }
  }
}
