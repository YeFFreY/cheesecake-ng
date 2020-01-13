import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Resource } from '@lib/hateoas';
import { ApiService } from '../../services/api.service';

/**
 * This directive displays or hide its content when the resource contains or not the given REL
 */
@Directive({
  selector: '[cheeIfResourceHasRel]'
})
export class IfResourceHasRelDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  /**
   * Sets the resource and the rel to trigger or not the display of the content
   * @param resource the resource supposed to contain the given REL
   * @param rel the REL to search for
   */
  @Input() set cheeIfResourceHasRel({ resource, rel }: { resource: Resource, rel: string }) {
    const found = !!ApiService.resourceLinkFor(resource, rel);
    if (found) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
