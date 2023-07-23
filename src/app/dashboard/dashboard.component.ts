import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public attendanceData: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.authService.getData(Number(userId)).subscribe(res => {
      this.attendanceData = res;
    })
  }

}
