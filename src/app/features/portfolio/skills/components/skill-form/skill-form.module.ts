import { NgModule } from '@angular/core';
import { SkillFormComponent } from './skill-form.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ SkillFormComponent ],
  exports: [ SkillFormComponent ]
})
export class SkillFormModule {
}
