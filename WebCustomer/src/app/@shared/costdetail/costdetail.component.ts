import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tipinfo, Costdetail, Tips } from '@entities';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-costdetail',
  templateUrl: './costdetail.component.html',
  styleUrls: ['./costdetail.component.scss'],
})
export class CostdetailComponent implements OnInit {
  propinaov: boolean = true;
  propinavalue: number;
  value: number = 0;
  valueov: number = 0;
  valorreal: number = 0;
  tipListServ: Array<Tips> = new Array<Tips>();
  tipList: Array<Tipinfo> = new Array<Tipinfo>();

  @Output() onDataChange = new EventEmitter<Costdetail>();

  constructor(private route: ActivatedRoute) {
    this.tipListServ = this.route.snapshot.data['tipsList'];
    this.tipList = this.cargarTipList();
    this.propinavalue = null;
  }

  ngOnInit(): void {}
  changeclick(val: any) {}

  onChangeVasegurar(val: any) {
    if (val == -1) {
      this.propinaov = false;
    } else {
      this.propinaov = true;
      this.valorreal = val;
      this.retornarRta();
    }
  }
  /**
   *
   *
   * @return {*}  {Array<Tipinfo>}
   * @memberof CostdetailComponent
   */
  cargarTipList(): Array<Tipinfo> {
    const tipinfol = new Array<Tipinfo>();
    this.tipListServ.forEach((r: Tips) => {
      const value = new Tipinfo();
      value.tip = r.value;
      value.value = r.value.toString();
      tipinfol.push(value);
    });
    const value = new Tipinfo();
    value.tip = -1;
    value.value = 'Otro Valor';
    tipinfol.push(value);
    return tipinfol;
  }
  /**
   *
   *
   * @memberof CostdetailComponent
   */
  onblurPropina(val: any) {
    this.valorreal = this.valueov;
    this.retornarRta();
  }
  /**
   *
   *
   * @memberof CostdetailComponent
   */
  onblurValorSeg(val: any) {
    this.retornarRta();
  }
  /**
   *
   *
   * @memberof CostdetailComponent
   */
  retornarRta() {
    const result = new Costdetail();
    result.insuredvalue = this.value;
    result.tip = this.valorreal;
    this.onDataChange.emit(result);
  }
}
