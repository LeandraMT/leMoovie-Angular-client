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

export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  userProfile(): void {
    this.router.navigate(['profile']);
  }

  // Opening the dialogs
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

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.snackBar.open('Successfully logged out.', 'X', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }
}
