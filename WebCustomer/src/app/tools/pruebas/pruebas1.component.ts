import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pruebas1',
  templateUrl: './pruebas1.component.html',
  styleUrls: ['./pruebas1.component.scss'],
})
export class Pruebas1Component implements OnInit {
  productid: string;
  color: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productid = params['productid'];
      this.color = params['color'];
    });
  }
}
