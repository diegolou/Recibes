import { Injectable } from '@angular/core';
import { timer, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class clockValue {
  hours: number;
  minutes: string;
  ampm: string;
  weekday: string;
  day: number;
  month: string;
  daymonth: string;
  year: number;
  seconds: string;
}
export class ClockService {
  clock1: Observable<Date>;
  infofecha$ = new Subject<clockValue>();
  vr: clockValue;
  ampm: string;
  hours: number;
  minute: string;
  weekday: string;
  months: string;

  constructor() {
    this.clock1 = timer(0, 1000).pipe(
      map((t) => new Date()),
      shareReplay(1)
    );
  }
  getInfoReloj(): Observable<clockValue> {
    this.clock1.subscribe((t) => {
      this.hours = t.getHours() % 12;
      this.hours = this.hours ? this.hours : 12;
      //
      this.vr = {
        hours: this.hours,
        minutes: t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes().toString(),
        ampm: t.getHours() > 11 ? 'PM' : 'AM',
        daymonth: t.toLocaleString('en-US', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
        day: t.getDate(),
        month: t.toLocaleString('en-US', { month: 'long' }).replace('.', '').replace('-', ' '),
        year: t.getFullYear(),
        weekday: t.toLocaleString('en-US', { weekday: 'long' }).replace('.', ''),
        seconds: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString(),
      };
      this.infofecha$.next(this.vr);
    });
    return this.infofecha$.asObservable();
  }
}
