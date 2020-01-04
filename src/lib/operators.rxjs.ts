/**
 * Swallow potential incoming DataServiceError and return the error in the "next" channel so the observable will not
 * be in "error" state.
 */
import { ObservableInput, ObservedValueOf, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataServiceError, handleError } from './services.utils';
import { Left } from 'purify-ts/Either';

/*****************************************************************************
 * This file contains types/helpers/converters/... used to work with rxjs
 *****************************************************************************/

/**
 * Converts potential incoming error to a DataServiceError, keep the error on the "error" channel
 */
export function convertHttpError<T, O extends ObservableInput<any>>(): OperatorFunction<T, T | ObservedValueOf<O>> {
  return catchError(handleError);
}

/**
 * Swallow potential incoming DataServiceError and return the error in the "next" channel
 * so the observable will not be in "error" state.
 */
export function mapErrorToLeft<O extends ObservableInput<any>>()
  : OperatorFunction<any, any | ObservedValueOf<O>> {
  return catchError((error: DataServiceError) => {
    console.log('[Chee] Catching error and moving it to the "next" channel !');
    return of(Left(error));
  });
}
