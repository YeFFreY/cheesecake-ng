import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Resource } from '../../lib/hateoas';
import { HttpClient } from '@angular/common/http';

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
      id: 'dummy',
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

  it('should be able to retrieve resource with a valid REL', (done: DoneFn) => {
    const apiIndex: Resource = { id: 'api', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const testData: Resource = { id: 1, _links: [] };
    const service: ApiService = TestBed.get(ApiService);
    service.get('rel1').subscribe(value => {
      expect(value).toBe(testData);
      done();
    });

    const apiReq = httpTestingController.expectOne('api/index');
    expect(apiReq.request.method).toEqual('GET');
    apiReq.flush(apiIndex);
    const resourceReq = httpTestingController.expectOne('/api/rel1');
    expect(resourceReq.request.method).toEqual('GET');
    resourceReq.flush(testData);
  });

  it('should be able to post data with a valid REL', (done: DoneFn) => {
    const apiIndex: Resource = { id: 'api', _links: [ { rel: 'rel1', href: '/api/rel1' } ] };
    const testData: Resource = { id: 'posted', _links: [] };
    const service: ApiService = TestBed.get(ApiService);
    service.post('rel1', {}).subscribe(value => {
      expect(value).toBe(testData);
      done();
    });

    const apiReq = httpTestingController.expectOne('api/index');
    expect(apiReq.request.method).toEqual('GET');
    apiReq.flush(apiIndex);
    const resourceReq = httpTestingController.expectOne('/api/rel1');
    expect(resourceReq.request.method).toEqual('POST');
    resourceReq.flush(testData);
  });
});
