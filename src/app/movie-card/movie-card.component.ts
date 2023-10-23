import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Components
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatRipple } from '@angular/material/core';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

/**
 * @remarks
 * This component displays movie cards and provides actions like viewing additional information
 */
export class MovieCardComponent {
  /**
   * Array to store movie data
   * @property {any[]} movies
   */
  movies: any[] = [];

  /**
   * Constructs a new MovieCardComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatSnackBar} snackBar - The snackbar service for displaying notifications.
   * @param {MatDialog} dialog - The Angular Material dialog service for opening dialogs.
   * @param {Router} router - The Angular router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @remarks
   * Fetches data from API and stores movie data in the movies property
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Navigates to the user's profile
   */
  userProfile(): void {
    this.router.navigate(['profile']);
  }

  /** 
   * Opening the dialogs for Genre, Director and Synopsis
   */
  openGenreDialog(): void {
    this.dialog.open(GenreDialogComponent, {
      width: '300px'
    });
  }

  openDirectorDialog(): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '300px'
    });
  }

  openSynopsisDialog(): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '300px'
    });
  }

  /**
   * Logs the user out
   * @remarks
   * Clears the user and token data from the local storage and navigates to the welcome page
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
