import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillsLazyModule } from './skills.lazy-module';
import { SkillCreateComponent } from './skill-create/skill-create.component';

@NgModule({
  declarations: [ SkillsComponent, SkillListComponent, SkillCreateComponent ],
  imports: [
    CommonModule,
    SkillsLazyModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule {
}
