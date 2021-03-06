import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from './error/error.module';
import { HateoasModule } from './hateoas/hateoas.module';

/**
 * Imported in every feature module that needs some shared components.
 * It is recommended to avoid having services in the SharedModule because
 * you will end up with a lot of instances of that service.
 * This is the perfect place for importing and exporting back your UI Modules
 * or components that are used a lot in your application (f.i. Angular Material modules, the Flex Layout Module,...).
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    HateoasModule
  ],
  exports: [
    ReactiveFormsModule,
    ErrorModule,
    HateoasModule
  ]
})
export class SharedModule {
}
