import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { GeoLocationService } from '@core/Requests';
import { KalmanOnLocationService } from '@core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pruebarastreo',
  templateUrl: './pruebarastreo.component.html',
  styleUrls: ['./pruebarastreo.component.scss'],
})
export class PruebarastreoComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public maxSpeed: number;
  public zoom: number;
  public packerid: string;
  public activityId: string;
  public kalmanConstant: number;
  public filtro: boolean;
  public polyline: Array<any>;
  public polylines: Array<any>;
  // @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private geolocations: GeoLocationService,
    private kalman: KalmanOnLocationService
  ) {}

  ngOnInit(): void {
    this.zoom = 16;
    this.maxSpeed = 40;
    this.latitude = 4.6955404;
    this.longitude = -74.0400516;

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {});
  }

  private rebuildPolylines() {
    let polylines = [];
    let i = 0;
    let newPolyline = { path: [] as any[], color: 'blue' };
    for (let point of this.polyline) {
      console.log(point);
      newPolyline.path.push(point);
      const speedChanged =
        (this.polyline[i + 1] && point.speed < this.maxSpeed && this.polyline[i + 1].speed < this.maxSpeed) ||
        (point.speed > this.maxSpeed && this.polyline[i + 1].speed > this.maxSpeed);
      if (point.speed > this.maxSpeed) {
        newPolyline.color = 'red';
      }
      if (speedChanged) {
        newPolyline.path.push(this.polyline[i + 1]);
        polylines.push(newPolyline);
        newPolyline = { path: [], color: 'blue' };
      }
      i++;
    }
    console.log(polylines);
    return polylines;
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  drawPolyline() {
    this.getGeoLocation(this.packerid, this.activityId);
  }
  getGeoLocation(packerId: string, activityid: string) {
    this.geolocations
      .getGeoLocationCustomer(packerId, activityid)
      .pipe(
        finalize(() => {
          // this.registryForm.markAsPristine();
          // this.isLoading = false;
        })
      )
      .subscribe((geolocation) => {
        if (!this.filtro) {
          this.polylines = geolocation.GeoLocationList;
        } else {
          this.polylines = this.kalman.runKalmanOnLocations(geolocation.GeoLocationList, this.kalmanConstant);
        }
        const luis = 1;
      });
  }
}
