import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';

@NgModule({
  declarations: [ SkillsComponent, SkillListComponent ],
  imports: [
    CommonModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule {
}
