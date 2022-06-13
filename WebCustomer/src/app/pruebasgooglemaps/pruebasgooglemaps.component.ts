import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-pruebasgooglemaps',
  templateUrl: './pruebasgooglemaps.component.html',
  styleUrls: ['./pruebasgooglemaps.component.scss'],
})
export class PruebasgooglemapsComponent implements OnInit {
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;

  lat = 0;
  lng = 0;
  getAddress: any;
  zoom: any;

  formattedaddress = ' ';
  options = {
    componentRestrictions: {
      country: ['CO'],
    },
  };

  constructor(private apiloader: MapsAPILoader) {}

  ngOnInit(): void {
    this.get();
    // this.agmMap.triggerResize(true);
    this.zoom = 16;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('Resizing');
      this.agmMap.triggerResize();
    }, 100);
  }
  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng);

          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder();
            let latlng = {
              lat: this.lat,
              lng: this.lng,
            };
            geocoder.geocode(
              {
                location: latlng,
              },
              function (results: any) {
                if (results[0]) {
                  this.currentLocation = results[0].formatted_address;
                  console.log(this.currentLocation);
                } else {
                  console.log('Not found');
                }
              }
            );
          });
        }
      });
    }
  }

  mapClicked(latitude: any, longitude: any) {
    // const latitude = $event.coords.lat;
    //     const longitude = $event.coords.lng;
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      let latlng = {
        lat: latitude,
        lng: longitude,
      };
      geocoder.geocode(
        {
          location: latlng,
        },
        function (results: any) {
          if (results[0]) {
            this.currentLocation = results[0].formatted_address;
            console.log(this.currentLocation);
            alert(this.currentLocation);
          } else {
            console.log('Not found');
          }
        }
      );
    });
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
  }
}
