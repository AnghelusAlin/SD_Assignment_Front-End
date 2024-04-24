import { Component } from '@angular/core';
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test app';
  receivedName = 'you are not yet logged in'

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loggedIn.subscribe((username: string) => {
      this.handleEmit(username);
    });
  }

  handleEmit(value: string) {
    this.receivedName = value;

  }
}
