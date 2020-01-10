import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorsDirective } from './control-error.directive';
import { ControlErrorComponent } from './control-error.component';
import { FormSubmitDirective } from './form-submit.directive';

@NgModule({
  declarations: [
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    FormSubmitDirective,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
  ],
  entryComponents: [ ControlErrorComponent ]
})
export class ErrorModule {
}
