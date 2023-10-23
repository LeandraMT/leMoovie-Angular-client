import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

/**
 * @remarks
 * This component renders the favourite movies as cards and actions like logging out
 * Array to store user's favourite movies
 * @property {any[]} movies 
 * @property {Object} user - the user's data retrieved from the local storage
 */

export class ProfilePageComponent implements OnInit {
  /*movies: any[] = [];*/
  user = JSON.parse(localStorage.getItem('user') || '{}');

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Email: user.Email || '',
      Password: ''
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{ }');
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resutlt) => {
      localStorage.setItem('user', JSON.stringify(resutlt))
      this.user = resutlt;
      this.snackBar.open('Your user information has been updated', 'OK', {
        duration: 2000
      });
    })
  }

  /**
   * Navigates to movies page
   */
  moviesPage(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs the user out
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.snackBar.open('Successfully logged out.', 'X', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }
}
