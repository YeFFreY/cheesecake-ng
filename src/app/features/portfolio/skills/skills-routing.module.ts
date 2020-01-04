import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillListResolverService } from './services/skill-list-resolver.service';

const routes: Routes = [
  {
    path: '', component: SkillsComponent, children: [
      { path: '', component: SkillListComponent, resolve: { resolvedData: SkillListResolverService } }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SkillsRoutingModule {
}
