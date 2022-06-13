import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { ClockService, clockValue } from '@core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  datos$: Observable<clockValue>;
  hora: number;
  minutos: string;
  weekday: string;
  dia: number;
  mes: string;
  anio: number;
  fecha: string;
  ampm: string;
  segundos: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private clock: ClockService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.datos$ = this.clock.getInfoReloj();
    this.datos$.subscribe((x) => {
      this.hora = x.hours;
      this.minutos = x.minutes;
      this.weekday = x.weekday;
      this.dia = x.day;
      this.mes = x.month;
      this.anio = x.year;
      this.fecha = x.daymonth;
      this.ampm = x.ampm;
      this.segundos = x.seconds;
    });
    $(function () {
      // ------------------------------------------------------- //
      // Multi Level dropdowns
      // ------------------------------------------------------ //
      $("ul.dropdown-menu [data-toggle='dropdown']").on('click', function (event) {
        alert('click');
        event.preventDefault();
        event.stopPropagation();
        $(this).siblings().toggleClass('show');

        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        $(this)
          .parents('li.nav-item.dropdown.show')
          .on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass('show');
          });
      });
    });
  }
  get isAuthenticated(): boolean {
    const auth = this.credentialsService.isAuthenticated();

    return auth ? this.credentialsService.isAuthenticated() : false;
    // return false ;
  }
  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/home'], { replaceUrl: true }));
    const titlem = this.translateService.instant('Sign Out');
    const textm = this.translateService.instant('You left the VIP-PAC Customer session');

    Swal.fire({
      title: titlem,
      text: textm,
      showClass: {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation',
      },
      hideClass: {
        popup: '',
        backdrop: '',
      },
    });
  }

  login() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  register() {
    console.trace('entre');
    this.router.navigate(['/registry'], { replaceUrl: true });
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.usernamedescrip : null;
  }
}
