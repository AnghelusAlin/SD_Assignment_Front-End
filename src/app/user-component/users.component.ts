import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserModel } from '../entities/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
