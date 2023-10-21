import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.css']
})
export class SynopsisDialogComponent {
  synopsis: string = '';
  synopsisInfo: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SynopsisDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getSynopsisInfo();
  }

  getSynopsisInfo(): void {
    this.fetchApiData.getGenre(this.synopsis).subscribe(
      (data: any) => {
        this.synopsisInfo = data;
      },
      (error) => {
        console.error('Error while fetching genre info:', error);
      }
    );
  }
}
