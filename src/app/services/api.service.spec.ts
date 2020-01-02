import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Resource } from '../../lib/hateoas';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

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
});
