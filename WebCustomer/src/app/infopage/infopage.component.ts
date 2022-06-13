import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss'],
})
export class InfopageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  return() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
