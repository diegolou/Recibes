// import { Component, OnInit, Input } from '@angular/core';
// // import { MediosTransporte } from '@app/Entities/MediosTransporte';
// // import { MediosTransporteService } from '@app/medios-transporte.service';
// import { MessageService } from '@app/message.service';
// import { TipoServicio } from '@app/Entities/tiposervicio';

// @Component({
//   selector: 'app-medios-transporte',
//   templateUrl: './medios-transporte.component.html',
//   styleUrls: ['./medios-transporte.component.scss'],
// })
// export class MediosTransporteComponent implements OnInit {
//   vehiculos: MediosTransporte[];
//   vehiculoseleccionado: MediosTransporte;
//   @Input() selectedtiposervicio: TipoServicio;

//   constructor(private mtservice: MediosTransporteService, private messageService: MessageService) {}

//   ngOnInit(): void {
//     this.getMediosTranporte();
//     this.vehiculoseleccionado = this.vehiculos[0];
//   }

//   // onSelect(mTransporte: MediosTransporte): void {
//   onSelect(): void {
//     // this.vehiculoseleccionado = mTransporte;
//     this.messageService.add(
//       `MediosTransporteComponent: Selected Medio de transporte id=${this.vehiculoseleccionado.code} + idservicio=${this.selectedtiposervicio.code}`
//     );
//   }

//   getMediosTranporte(): void {
//     this.mtservice.getMediosTransporte().subscribe((vehiculos) => (this.vehiculos = vehiculos));
//   }
// }
