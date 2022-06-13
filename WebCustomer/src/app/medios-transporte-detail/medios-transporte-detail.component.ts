import { Component, OnInit, Input } from '@angular/core';
import { PackageInfo } from '@entities';

@Component({
  selector: 'app-medios-transporte-detail',
  templateUrl: './medios-transporte-detail.component.html',
  styleUrls: ['./medios-transporte-detail.component.scss'],
})
export class MediosTransporteDetailComponent implements OnInit {
  @Input() vehiculoseleccionado: PackageInfo;

  constructor() {}

  ngOnInit(): void {}
}
