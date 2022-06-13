import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { PaginatePipe } from './pipes/paginate.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule],
  declarations: [PaginatePipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  exports: [PaginatePipe],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
