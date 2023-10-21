import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.css']
})
export class DirectorDialogComponent implements OnInit {
  directorName: string = '';
  directorInfo: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getDirectorInfo();
  }

  getDirectorInfo(): void {
    this.fetchApiData.getGenre(this.directorName).subscribe(
      (data: any) => {
        this.directorInfo = data;
      },
      (error) => {
        console.error('Error while fetching genre info:', error);
      }
    );
  }
}
