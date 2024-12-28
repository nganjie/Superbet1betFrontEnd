import { Component, Input, OnInit } from '@angular/core';
import { PariType } from '../models/pari_cotation';

@Component({
  selector: 'app-pari-item',
  templateUrl: './pari-item.component.html',
  styleUrls: ['./pari-item.component.scss']
})
export class PariItemComponent implements OnInit {

  @Input() pari!: PariType;
  constructor() { }

  ngOnInit(): void {
  }

}
