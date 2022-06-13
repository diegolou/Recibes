import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoServicio } from '@app/Entities/TipoServicio';
import { TipoServiciosService } from '@app/tipo-servicios.service';
import { MessageService } from '@app/message.service';

@Component({
  selector: 'app-tipo-servicios',
  templateUrl: './tipo-servicios.component.html',
  styleUrls: ['./tipo-servicios.component.scss'],
})
export class TipoServiciosComponent implements OnInit {
  tiposervicioseleccionado: TipoServicio;
  selectedTab: number = 0;

  @Output() propagar = new EventEmitter<TipoServicio>();
  tiposervicio: TipoServicio[];

  constructor(private tsservice: TipoServiciosService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getTipoServicio();
  }

  // onSelect(mTransporte: MediosTransporte): void {
  onSelect(event: any): void {
    // this.vehiculoseleccionado = mTransporte;

    this.messageService.add(
      `tipoServicioComponent: Selected tipo de Servicio id=${this.tiposervicio[event.index].code}`
    );
    this.propagar.emit(this.tiposervicio[event.index]);
  }

  getTipoServicio(): void {
    this.tsservice.getTipoServicio().subscribe((tiposervicio) => (this.tiposervicio = tiposervicio));
  }
}
