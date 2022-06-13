import { Injectable } from '@angular/core';
import { GeoLocation } from '@app/Entities';

@Injectable({
  providedIn: 'root',
})
export class KalmanOnLocationService {
  constructor() {}

  private _toRadians(value: number) {
    return (value * Math.PI) / 180;
  }

  private _calculateGreatCircleDistance(locationA: GeoLocation, locationZ: GeoLocation) {
    const lat1 = locationA.latitude;
    const lon1 = locationA.longitude;
    const lat2 = locationZ.latitude;
    const lon2 = locationZ.longitude;

    const p1 = this._toRadians(lat1);
    const p2 = this._toRadians(lat2);
    const deltagamma = this._toRadians(lon2 - lon1);
    const R = 6371e3; // gives d in metres
    const d = Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma)) * R;

    return isNaN(d) ? 0 : d;
  }

  private Kalman(location: GeoLocation, lastLocation: GeoLocation, constant: number) {
    const variance: number = 0;
    const accuracy = Math.max(location.accuracy, 1);
    const result = { ...location, ...lastLocation, variance };

    if (!lastLocation) {
      result.variance = accuracy * accuracy;
    } else {
      const timestampInc = location.timestamp.getTime() - lastLocation.timestamp.getTime();

      if (timestampInc > 0) {
        // We can tune the velocity and particularly the coefficient at the end
        const velocity = (this._calculateGreatCircleDistance(location, lastLocation) / timestampInc) * constant;
        result.variance += (timestampInc * velocity * velocity) / 1000;
      }

      const k = result.variance / (result.variance + accuracy * accuracy);
      result.latitude += k * (location.latitude - lastLocation.latitude);
      result.longitude += k * (location.longitude - lastLocation.longitude);
      result.variance = (1 - k) * result.variance;
    }
    return result;
    // return {
    //   ...location,
    //  ...this. .pick(result, ["latitude", "longitude", "variance"])
    // };
  }

  public runKalmanOnLocations(rawData: GeoLocation[], kalmanConstant: number) {
    let lastLocation: GeoLocation;
    return rawData
      .map((location) => ({
        ...location,
        timestamp: new Date(location.timestamp),
      }))
      .map((location) => {
        lastLocation = this.Kalman(location, lastLocation, kalmanConstant);
        return lastLocation;
      });
  }
}
