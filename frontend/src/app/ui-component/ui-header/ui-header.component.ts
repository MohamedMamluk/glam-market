import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.css'],
})
export class UiHeaderComponent {
  @Output() sidenavToggle = new EventEmitter();
  constructor() {}
  @Input() navLinks: string[] = [];
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
