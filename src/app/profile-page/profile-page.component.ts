import { Component } from '@angular/core';
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
 */
export class ProfilePageComponent {
  /**
   * Array to store user's favourite movies
   * @property {any[]} movies 
   * @property {Object} user - the user's data retrieved from the local storage
   */
  movies: any[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');


  /**
   * Constructs a new ProfilePageComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatSnackBar} snackBar - The snackbar service for displaying notifications.
   * @param {Router} router - The Angular router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((data) => {
      this.movies = data.slice(0, 3);
    });
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
