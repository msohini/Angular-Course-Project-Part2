import { Directive, ElementRef, OnInit, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  'selector': '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isopen=false

  @HostListener('click') toggleOpen() {
    this.isopen = !this.isopen;
  }

}
