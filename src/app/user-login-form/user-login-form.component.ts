import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Import from the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})

/**
 * @remarks
 * This component handles the user login where a form pops up and users can input their Username and Password
 */
export class UserLoginFormComponent implements OnInit {

  /**
   * @param {Object} loginData - the Username and Password data are processed here
   */
  @Input() loginData = {
    Username: '',
    Password: ''
  };

  /**
   * Constructs a new UserLoginFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - The reference to the dialog for this component.
   * @param {MatSnackBar} snackBar - The snackbar service for displaying notifications.
   * @param {Router} router - The Angular router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      console.log(result);

      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

      this.dialogRef.close();
      this.snackBar.open('Successfully logged in', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open('Login failed, please try again', 'OK', {
        duration: 2000
      });
    });
  }

}
