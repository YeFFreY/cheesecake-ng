import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

/**
 * This directive uses the apiService to know if the given REL is part of the index API and then hide/display its content.
 */
@Directive({
  selector: '[cheeIfHasRel]'
})
export class IfHasRelDirective implements OnDestroy {
  private hasRelSub: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  @Input() set cheeIfHasRel(rel: string) {
    this.hasRelSub = this.apiService.hasRel(rel).subscribe(
      found => {
        if (found) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.hasRelSub) {
      this.hasRelSub.unsubscribe();
    }
  }

}
