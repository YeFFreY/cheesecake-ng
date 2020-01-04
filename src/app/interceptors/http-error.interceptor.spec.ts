import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataServiceError } from '../../lib/services.utils';

describe('HttpErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should catch http not found and convert it to DataServiceError', () => {
    httpClient.get('/dummyURL')
      .subscribe(
        _data => fail('Should have converted the error to DataServiceError'),
        error => {
          expect((error as DataServiceError).errorType).toEqual('NotFound');
        }
      );
    const req = httpMock.expectOne('/dummyURL');
    req.flush({}, { status: 404, statusText: 'not found' });
  });

  it('should catch network error and convert it to DataServiceError', () => {
    httpClient.get('/dummyURL')
      .subscribe(
        _data => fail('Should have converted the error to DataServiceError'),
        error => {
          expect((error as DataServiceError).errorType).toEqual('Network');
        }
      );
    const req = httpMock.expectOne('/dummyURL');
    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: 'simulated error network',
    });

    // Respond with mock error
    req.error(mockError);
  });

});
