import {Component, Input, Output} from "@angular/core";
import { UserService } from "../services/user.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() testInput: any = "No input received!";
  user = {
    username: "",
    password: "",
  };

  constructor(private userService: UserService) {}
  receivedName: string = "No name received yet"; // New property to store the emitted name

  login() {
    this.receivedName = this.user.username;
    this.userService.login(this.user).subscribe(
      (response) => {
        // Login successful
        console.log("Login successful:", response);
        // Redirect to the home page or navigate to another route
      },
      (error) => {
        // Login failed
        console.error("Login failed:", error);
        // Display error message to the user
      }
    );
  }
}
