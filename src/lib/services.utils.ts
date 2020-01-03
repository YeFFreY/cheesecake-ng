/*****************************************************************************
 * This file contains types/helpers/converters/... which can be reused
 * and are related to services (mainly http communication).
 * For instance :
 * - mark a request as a subRequest
 * - definition of the DataServiceError (main error used through the app)
 * - memoized fn to extract ID of Resource array
 * - ...
 *****************************************************************************/

/**
 * Union type describing possible error which can happen when calling a service.
 */
type errorTypes = 'Unauthorized' | 'NotFound' | 'Validation' | 'Unexpected' | 'ServiceUnavailable';

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
