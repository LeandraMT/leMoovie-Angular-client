import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.css']
})
export class GenreDialogComponent implements OnInit {
  genreName: any = localStorage.getItem('genreName')?.toString();
  genreInfo: any

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getGenreInfo();
  }

  getGenreInfo(): void {
    this.fetchApiData.getGenre(this.genreName).subscribe(
      (data: any) => {
        this.genreInfo = data;
      },
      (error) => {
        console.error('Error while fetching genre info:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
