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
  favouriteMovies: any[] = [];
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

    this.getFavouriteMovies();
  }

  //Saving the user object to localStorage
  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Handling the form inputs to the backend
  updateUserHandler(obj: any): any {
    const updatedUser: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '') {
        updatedUser[key] = obj[key];
      }
    });
    return updatedUser;
  }



  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{ }');
  }

  updateUser(): void {
    const newData = this.updateUserHandler(this.userData);
    this.fetchApiData.editUser(newData).subscribe((result) => {
      this.snackBar.open('Your information has been updated', 'OK', {
        duration: 2000,
      });
      this.setUser(result);
      window.location.reload();
    })
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has been deleted.', 'OK', {
          duration: 2000
        });
        this.fetchApiData.deleteUser().subscribe((resp: any) => {
          localStorage.clear();
        });
      });
    }
  }

  getFavouriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((data) => {
      this.favouriteMovies = data;
    });
  }

  deleteFavouriteMovies(id: string): void {
    this.fetchApiData.deleteFavouriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('Movie removed from favourites', 'OK', {
        duration: 2000,
      });
      this.setUser(resp);
      window.location.reload();
    })
  }

  moviesPage(): void {
    this.router.navigate(['movies']);
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
