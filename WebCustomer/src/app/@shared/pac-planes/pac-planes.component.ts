import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacPlanes } from '@entities';

@Component({
  selector: 'app-pac-planes',
  templateUrl: './pac-planes.component.html',
  styleUrls: ['./pac-planes.component.scss'],
})
export class PacPlanesComponent implements OnInit {
  pacplanes: PacPlanes;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.pacplanes = this.route.snapshot.data['planstype'];
    if (this.pacplanes) {
    } else {
      this.router.navigate(['/infopage']);
    }
  }
}
