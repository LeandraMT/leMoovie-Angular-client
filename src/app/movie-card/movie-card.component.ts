import { Component, HostListener } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Components
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

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
  movies: any[] = [];
  columnCount: number = 5;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router) { }


  ngOnInit(): void {
    this.getMovies();
    this.updateGridColumns();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateGridColumns();
  }


  //Responsive with host listener
  updateGridColumns() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 460) {
      this.columnCount = 1;
    }
    else if (screenWidth > 476 && screenWidth <= 660) {
      this.columnCount = 2;
    }
    else if (screenWidth > 661 && screenWidth <= 975) {
      this.columnCount = 3;
    }
    else if (screenWidth > 976 && screenWidth <= 1280) {
      this.columnCount = 4;
    }
    else {
      this.columnCount = 5;
    }
  }

  //Saving the user object to localStorage
  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
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

  addMovieToFavourites(id: string): void {
    this.fetchApiData.addFavouriteMovies(id).subscribe((resp: any) => {
      let movie = this.movies.find((m: any) => m._id === id);
      this.snackBar.open(`${movie.Title} has been added to your favourite list`, 'OK', {
        duration: 2000
      });
      this.setUser(resp);
      this.router.navigate(['profile']);
    },
      (error) => {
        console.error('There has been an error while adding to favourites', error);
        this.snackBar.open('Failed to add movie to favourite list', 'X', {
          duration: 2000
        })
      });
  }

  openGenreDialog(genreName: any): void {
    localStorage.setItem('genreName', genreName);
    this.dialog.open(GenreDialogComponent, {
      width: '300px'
    });
  }

  openDirectorDialog(directorName: any): void {
    localStorage.setItem('directorName', directorName);
    this.dialog.open(DirectorDialogComponent, {
      width: '300px',
      data: { directorName: directorName }
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
