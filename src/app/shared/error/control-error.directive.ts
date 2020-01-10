import { ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, OnInit, Optional, Self, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { ControlErrorComponent } from './control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorContainerDirective } from './control-error-container.directive';

/**
 * Thanks to :
 * https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  res: Subscription | null = null;
  ref: ComponentRef<ControlErrorComponent> | null = null;
  container: ViewContainerRef;

  errors: { [key: string]: (params?: any) => string } = {
    required: () => 'This field is required',
    minlength: ({ requiredLength, actualLength }: { requiredLength: number, actualLength: number }) =>
      `Expect ${ requiredLength } but got ${ actualLength }`
  };

  private submit$: Observable<Event>;
  private reset$: Observable<Event>;

  constructor(@Self() private controlDir: NgControl,
              @Optional() controlErrorContainer: ControlErrorContainerDirective,
              @Optional() private form: FormSubmitDirective,
              private vcr: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.reset$ = this.form ? this.form.reset$ : EMPTY;
  }

  ngOnInit(): void {
    this.res = this.reset$.subscribe(() => {
      if (this.ref) {
        this.setError(null);
      }
    });

    if (this.control) {
      const theControl = this.control;
      this.sub =
        merge(
          this.submit$,
          theControl.valueChanges
        )
          .subscribe(() => {
            const controlErrors = theControl.errors;
            if (controlErrors) {
              const firstKey = Object.keys(controlErrors)[0];
              const getError = this.errors[firstKey];

              if (!getError) {
                return;
              }

              const text = getError(controlErrors[firstKey]);
              this.setError(text);
            } else if (this.ref) {
              this.setError(null);
            }
          });
    } else {
      console.error('[Chee] Control is null, unable to sub to valueChanges');
    }
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string | null) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
