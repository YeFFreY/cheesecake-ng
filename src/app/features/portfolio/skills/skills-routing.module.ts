import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';

const routes: Routes = [
  {
    path: '', component: SkillsComponent, children: [
      { path: '', component: SkillListComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SkillsRoutingModule {
}
