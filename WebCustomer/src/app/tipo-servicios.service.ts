import { Injectable } from '@angular/core';
import { TipoServicio } from '@app/Entities/TipoServicio';
import { MEDIOSSERVICIO } from '@app/tipo-servicios/bd-tipo-servicios';
import { Observable, of } from 'rxjs';
import { MessageService } from '@app/message.service';

@Injectable({
  providedIn: 'root',
})
export class TipoServiciosService {
  constructor(private messageService: MessageService) {}

  getTipoServicio(): Observable<TipoServicio[]> {
    this.messageService.add('TipoServicioService: fetched tiposervicio');
    return of(MEDIOSSERVICIO);
  }
}
