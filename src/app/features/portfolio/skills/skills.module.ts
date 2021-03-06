import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillsLazyModule } from './skills.lazy-module';
import { SkillCreateComponent } from './skill-create/skill-create.component';
import { SkillFormModule } from './components/skill-form/skill-form.module';
import { SkillShowComponent } from './skill-show/skill-show.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [ SkillsComponent, SkillListComponent, SkillCreateComponent, SkillShowComponent, SkillEditComponent ],
  imports: [
    CommonModule,
    SharedModule,
    SkillsLazyModule,
    SkillFormModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule {
}
