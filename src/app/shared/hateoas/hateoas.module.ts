import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfHasRelDirective } from './if-has-rel.directive';
import { IfResourceHasRelDirective } from './if-resource-has-rel.directive';

@NgModule({
  declarations: [ IfHasRelDirective, IfResourceHasRelDirective ],
  imports: [
    CommonModule
  ],
  exports: [
    IfHasRelDirective, IfResourceHasRelDirective
  ]
})
export class HateoasModule {
}
