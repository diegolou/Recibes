import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-distanceinfo',
  templateUrl: './distanceinfo.component.html',
  styleUrls: ['./distanceinfo.component.scss'],
})
export class DistanceinfoComponent implements OnInit {
  distancia: number;
  tarifa: number;
  @Input() set distance(dist: number) {
    this.distancia = dist / 1000;
    // this.distancia = this.Distancia();
  }

  @Input() set tariff(t: number) {
    this.tarifa = t;
  }
  constructor() {
    this.distancia = 0;
    this.tarifa = 0;
  }

  ngOnInit(): void {}
}
