import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillsComponent } from './skills.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillListResolverService } from './services/skill-list-resolver.service';
import { SkillCreateComponent } from './skill-create/skill-create.component';
import { SkillShowComponent } from './skill-show/skill-show.component';
import { SkillResolverService } from './services/skill-resolver.service';
import { SkillEditComponent } from './skill-edit/skill-edit.component';

const routes: Routes = [
  {
    path: '', component: SkillsComponent, children: [
      { path: '', component: SkillListComponent, resolve: { resolvedData: SkillListResolverService } },
      { path: 'create', component: SkillCreateComponent },
      { path: ':id', component: SkillShowComponent, resolve: { resolvedData: SkillResolverService } },
      { path: ':id/edit', component: SkillEditComponent, resolve: { resolvedData: SkillResolverService } }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SkillsRoutingModule {
}
