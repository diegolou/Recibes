import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.translate
      .get(['ITEMS_PER_PAGE', 'NEXT_PAGE', 'PREVIOUS_PAGE', 'FIRST_PAGE_LABEL', 'LAST_PAGE_LABEL', 'OF_LABEL'])
      .subscribe((translation) => {
        this.itemsPerPageLabel = translation['ITEMS_PER_PAGE'];
        this.nextPageLabel = translation['NEXT_PAGE'];
        this.previousPageLabel = translation['PREVIOUS_PAGE'];
        this.firstPageLabel = translation['FIRST_PAGE_LABEL'];
        this.lastPageLabel = translation['LAST_PAGE_LABEL'];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };
}
