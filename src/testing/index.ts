// Utilities from https://github.com/angular/angular/blob/master/aio/content/examples/testing/src/testing/index.ts
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
import { DebugElement } from '@angular/core';
import { ComponentFixture, tick } from '@angular/core/testing';

///// Short utilities /////

/** Wait a tick, then detect changes */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

/**
 * Create custom DOM event the old fashioned way
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
 * Although officially deprecated, some browsers (phantom) don't accept the preferred "new Event(eventName)"
 */
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
// #docregion click-event
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
// tslint:disable-next-line:variable-name
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
