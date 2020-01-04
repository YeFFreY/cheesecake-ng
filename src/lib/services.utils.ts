/*****************************************************************************
 * This file contains types/helpers/converters/... which can be reused
 * and are related to services (mainly http communication).
 * For instance :
 * - mark a request as a subRequest
 * - definition of the DataServiceError (main error used through the app)
 * - memoized fn to extract ID of Resource array
 * - ...
 *****************************************************************************/

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Union type describing possible error which can happen when calling a service.
 */
type errorTypes = 'Unauthorized' | 'NotFound' | 'Validation' | 'Unexpected' | 'Network' | 'ServiceUnavailable';

export class DataServiceError {
  constructor(
    readonly errorType: errorTypes,
    readonly message: string,
    readonly friendlyMessage: string) {
  }
}

/**
 * This is the error to use when the rel was not found on the resource (or the api index)
 * @param serviceRel the rel that was requested
 */
export const unavailableServiceError = (serviceRel: string) => new DataServiceError(
  'ServiceUnavailable',
  'Service is not available',
  `The service [${ serviceRel }] was not found in the catalog of available services`);

/**
 * Converts the given HTTP status code to an errorTypes
 * TODO : could this be just an enum ?
 * @param status the http status code
 */
export const fromStatus = (status: number): errorTypes => {
  switch (status) {
    case 400:
      return 'Validation';
    case 401:
      return 'Unauthorized';
    case 404:
      return 'NotFound';
    default:
      return 'Unexpected';
  }
};

/**
 * Throw a DataServiceError depending the HttpErrorResponse received.
 * @param errorResponse the http response to convert to a DataServiceError.
 */
export const handleError = (errorResponse: HttpErrorResponse) => {
  console.error('[Chee] handling error and converting it to DataServiceError');
  let dataServiceError;
  if (errorResponse.error instanceof ErrorEvent) {
    // A client side or network error occured.
    dataServiceError = new DataServiceError(
      'Network',
      errorResponse.error.message,
      'Are we having a network issue ?');
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contains the error items to give more details about what went wrong.
    dataServiceError = new DataServiceError(
      fromStatus(errorResponse.status),
      errorResponse.statusText,
      `The Server returned a ${ errorResponse.status }, the error message is: "${ errorResponse.message }"`
    );
  }

  return throwError(dataServiceError);
};
