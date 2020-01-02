import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ]
})
export class SharedModule {
}
