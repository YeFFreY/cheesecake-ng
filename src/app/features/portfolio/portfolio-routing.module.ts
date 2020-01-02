import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  {
    path: '', component: PortfolioComponent, children: [
      { path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule) }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PortfolioRoutingModule {
}
