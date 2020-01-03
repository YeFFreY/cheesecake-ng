import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Resource } from '../../lib/hateoas';
import { HttpClient } from '@angular/common/http';
import { DataServiceError } from '../../lib/services.utils';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should be able to convert Resource links array to a map with rel as KEY and href as VALUE', () => {
    const service: ApiService = TestBed.get(ApiService);
    const resource: Resource = {
      id: 'api',
      _links: [
        { rel: 'rel1', href: '/api/rel1' },
        { rel: 'rel2', href: '/api/rel2' }
      ]
    };

    // @ts-ignore
    const linksMap = service.linksArrayToMap(resource);
    expect(linksMap).toEqual(
      {
        rel1: '/api/rel1',
        rel2: '/api/rel2',
      }
    );
  });

  it('should be able to convert undefined/null Resource links array to an empty map', () => {
    const service: ApiService = TestBed.get(ApiService);
    const resourceWithoutLinks: Resource = {
      id: 'api'
    };

    // @ts-ignore
    const linksMap = service.linksArrayToMap(resourceWithoutLinks);
    expect(linksMap).toEqual({});
  });

  it('should be able to retrieve resource with a valid REL', () => {
    const apiIndex: Resource = { id: 'api', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const testData: Resource = { id: 1, _links: [] };
    const service: ApiService = TestBed.get(ApiService);

    service.get('rel1').subscribe(value => {
      expect(value).toBe(testData);
    });

    const apiReq = httpTestingController.expectOne('api/index');
    expect(apiReq.request.method).toEqual('GET');
    apiReq.flush(apiIndex);
    const resourceReq = httpTestingController.expectOne('/api/rel1');
    expect(resourceReq.request.method).toEqual('GET');
    resourceReq.flush(testData);
  });

  it('should be able to retrieve resource with a valid REL from a given resource', () => {
    const resource: Resource = { id: 'resource', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const testData: Resource = { id: 1, _links: [] };
    const service: ApiService = TestBed.get(ApiService);

    service.getFromResource(resource, 'rel1').subscribe(value => {
      expect(value).toBe(testData);
    });

    const resourceReq = httpTestingController.expectOne('/api/rel1');
    expect(resourceReq.request.method).toEqual('GET');
    resourceReq.flush(testData);
  });

  it('should get an error when trying to retrieve resource with an invalid REL from the given resource', () => {
    const resource: Resource = { id: 'resource', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const service: ApiService = TestBed.get(ApiService);

    service.getFromResource(resource, 'invalidRel').subscribe(
      _value => {
        fail('should have not return a valid response');
      },
      (error: DataServiceError) => {
        expect(error.errorType).toEqual('ServiceUnavailable');
      });

    httpTestingController.expectNone('/api/rel1');
  });

  it('should get an error when trying to retrieve resource with a REL from a resource without links', () => {
    const resource: Resource = { id: 'resource' };
    const service: ApiService = TestBed.get(ApiService);

    service.getFromResource(resource, 'anyRel').subscribe(
      _value => {
        fail('should have not return a valid response');
      },
      (error: DataServiceError) => {
        expect(error.errorType).toEqual('ServiceUnavailable');
      });

  });

  it('should be able to post data with a valid REL', () => {
    const apiIndex: Resource = { id: 'api', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const testData: Resource = { id: 'posted', _links: [] };
    const service: ApiService = TestBed.get(ApiService);

    service.post('rel1', {}).subscribe(value => {
      expect(value).toBe(testData);
    });

    const apiReq = httpTestingController.expectOne('api/index');
    expect(apiReq.request.method).toEqual('GET');
    apiReq.flush(apiIndex);
    const resourceReq = httpTestingController.expectOne('/api/rel1');
    expect(resourceReq.request.method).toEqual('POST');
    resourceReq.flush(testData);
  });
});
