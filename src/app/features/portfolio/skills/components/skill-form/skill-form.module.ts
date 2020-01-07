import { NgModule } from '@angular/core';
import { SkillFormComponent } from './skill-form.component';
import { SharedModule } from '../../../../../shared/shared.module';

// FIXME do I need this module now that I'm providing the formService into the create/edit component directly ?
@NgModule({
  imports: [ SharedModule ],
  declarations: [ SkillFormComponent ],
  exports: [ SkillFormComponent ]
})
export class SkillFormModule {
}
