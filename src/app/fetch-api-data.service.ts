import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { getNsPrefix } from '@angular/compiler';


// Declaring API that will provide data for the client app
const apiUrl = 'https://le-moovie.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  // Provides HttpClient to the entire class using this.http
  constructor(private http: HttpClient) { }


  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies/Genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    return user;
  }

  getFavouriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavouriteMovies),
      catchError(this.handleError)
    );
  }

  addFavouriteMovies(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    const token = localStorage.getItem('token');

    if (!user.FavouriteMovies) {
      user.FavouriteMovies = [];
    }

    user.FavouriteMovies.push(movieId);

    localStorage.setItem('user', JSON.stringify(user));

    return this.http.get(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavouriteMovies),
      catchError(this.handleError)
    );
  }

  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    const token = localStorage.getItem('token');

    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavouriteMovies(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{ }');
    const token = localStorage.getItem('token');

    delete user.FavouriteMovies[movieId];

    localStorage.setItem('user', JSON.stringify(user));

    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    }
    else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}


