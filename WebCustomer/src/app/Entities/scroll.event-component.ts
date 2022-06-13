import { Component, NgZone, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-scroll-event',
  //templateUrl: './scroll-event.component.html',
  //styleUrls: ['./scroll-event.component.scss']
})
export class ScrollEventComponent implements AfterViewInit, OnDestroy {
  // Stream that will update title font size on scroll down
  size$ = new Subject();

  // Unsubscriber for elementScrolled stream.
  private _scrollSubscription = Subscription.EMPTY;

  // Get NgScrollbar reference
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;

  text = randomText;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled
      .pipe(
        map((e: any) => (e.target.scrollTop > 50 ? '0.75em' : '1em')),
        tap((size: string) => this.ngZone.run(() => this.size$.next(size)))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._scrollSubscription.unsubscribe();
  }
}

const randomText = `Most widely-used formats of colour codes: HTML, RGB, HEX, HSB/HSV, HSL, CMYK and Delphi.
Averaged colour sampling for easy handling of colour noise.
3x, 9x and 15x magnifier and keyboard control of the mouse cursor movements for greater precision.
Calculation of the pixel distance between points.
Colour list for saving and reusing the picked colour samples.
The ability to open, edit and save Adobe Photoshop .aco colour swatches (Adobe color files) and GIMP .gpl palette files.
Interaction with the standard Windows or Mac OS colour dialog.
User’s comments and notes for any picked colour.
Conversion of HTML/Hexadecimal and RGB colour codes into the corresponding colours.
Red-Green-Blue (RGB), Cyan-Magenta-Yellow (CMY) and Red-Yellow-Blue (RYB) colour wheels with marked triads and complementary colours.
Harmonious colour scheme generator.
RGB, HSV and HSL colour editors for adjusting and editing colours.
Gradient transition between the two colours for creating a wide range of in-between hues.
Text tool for evaluating the readability of the selected font and background colour combinations.
Optional stay-on-top behaviour.
User-defined hotkey for capturing colour values.
Copying the colour code to the clipboard with one mouse click or automatically.
CSS-compatible colour codes.
High-DPI awareness.
Multiple monitors support.
No installation required. Just Color Picker is a portable application and can be run directly from a USB stick.
Multilingual interface: Afrikaans, Arabic, Bulgarian, Catalan, Chinese (Simplified and Traditional), Croatian, Czech, Danish, Dutch, English, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swedish, Thai, Turkish, Ukrainian and Uyghur.`;
