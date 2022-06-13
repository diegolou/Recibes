import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeolocationService } from '@core/Requests/GeoLocation/geolocation.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CredentialsService } from '@app/auth';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  usuario: string;
  constructor(
    private geo: GeolocationService,
    private credentials: CredentialsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private translateService: TranslateService,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {}
  get username(): string | null {
    debugger;
    const credentials = this.credentials.credentials;
    return credentials ? credentials.username : null;
  }
  prueba() {
    debugger;
    this.geo
      .setGeoLocation('packer-lujoboan@outlook.com', 4.676765, 47.757676)
      .pipe(
        finalize(() => {
          alert('registro');
        })
      )
      .subscribe((rta: any) => {
        alert('Subscribe');
      });
  }
}
