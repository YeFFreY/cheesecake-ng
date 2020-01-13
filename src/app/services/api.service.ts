import { Injectable } from '@angular/core';
import * as urlTemplate from 'url-template';
import { flatMap, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { unavailableServiceError } from '@lib/services.utils';
import { Resource } from '@lib/hateoas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiIndex$: Observable<{ [rel: string]: string }> = this.http.get<Resource>('api/index').pipe(
    map((api) => this.linksArrayToMap(api)), // FIXME convert to simple call to lambda, check if "this" is ok :)
    tap(data => console.log('[Chee] - Api Index has been loaded', data)),
    shareReplay(1) // don't call the api index more than once
  );

  constructor(private http: HttpClient) {
  }

  get<T extends Resource | Array<Resource>>(rel: string, params: any = null): Observable<T> {
    return this.apiIndex$.pipe(
      switchMap(apis => {
        const link = apis[rel];
        // if the link was not found in the catalog then throw error
        return link ? of(link) : throwError(unavailableServiceError(rel));
      }),
      map((link: string) => ApiService.expandLink(link, params)), // replace any potential placeholder
      flatMap((link: string) => this.http.get<T>(link)) // perform the http GET
    );
  }

  getFromResource<T extends Resource | Array<Resource>>(resource: Resource, rel: string, headers: HttpHeaders = new HttpHeaders())
    : Observable<T> {
    const url = ApiService.resourceLinkFor(resource, rel);
    if (!url) {
      return throwError(unavailableServiceError(rel)); // didn't find the link on the given resource, so action not available
    }
    return this.http.get<T>(url, { headers });

  }

  put<T>(resource: Resource, rel: string, body: any): Observable<T> {
    const url = ApiService.resourceLinkFor(resource, rel);
    if (!url) {
      return throwError(unavailableServiceError(rel)); // didn't find the link on the given resource, so action not available
    }
    return this.http.put<T>(url, body);
  }

  post<T>(rel: string, body: any): Observable<T> {
    return this.apiIndex$.pipe(
      switchMap(apis => {
        const link = apis[rel];
        return link ? of(link) : throwError(unavailableServiceError(rel)); // if the link was not found in the catalog throw error
      }),
      map((link: string) => ApiService.expandLink(link)), // replace any potential placeholder
      flatMap((link: string) => this.http.post<T>(link, body)) // perform the http GET
    );
  }

  postForResource<T>(resource: Resource, rel: string, body: any): Observable<T> {
    const url = ApiService.resourceLinkFor(resource, rel);
    if (!url) {
      return throwError(unavailableServiceError(rel)); // didn't find the link on the given resource, so action not available
    }
    return this.http.post<T>(url, body);
  }

  deleteFromResource(resource: Resource): Observable<void> {
    const url = ApiService.resourceLinkFor(resource, 'delete');
    if (!url) {
      return throwError(unavailableServiceError('delete')); // didn't find the link on the given resource, so action not available
    }
    return this.http.delete<void>(url);
  }

  /**
   * Converts the given resources links array to map { [rel]: href}
   * @param resource The resource to get the links from
   */
  protected linksArrayToMap(resource: Resource) {
    if (!resource._links) {
      return {};
    }
    return resource._links
      .reduce(
        (acc: { [rel: string]: string }, link) =>
          ({ ...acc, [link.rel]: link.href }), {}
      );
  }

  /**
   * Does the api index contains the given REL ?
   * @param rel the rel to search for
   */
  hasRel(rel: string): Observable<boolean> {
    return this.apiIndex$.pipe(
      switchMap(apis => {
        const link = apis[rel];
        return of(!!link);
      }),
    );
  }

  /**
   * Parse link and replace potential placeholders using 'params"
   * @param link the link to parse
   * @param params the object with placeholder values
   */
  private static expandLink(link: string, params: any = null): string {
    return urlTemplate.parse(link).expand(params);
  }

  /**
   * Retrieves the url from the given Resource using the provided 'rel'.
   * @param resource the resource to search link on.
   * @param rel the 'rel' value to select the correct url
   */
  public static resourceLinkFor(resource: Resource, rel: string): string | null {
    if (!resource || !rel || !resource._links) {
      // no resource or rel given
      return null;
    }
    // search the correct ResourceLink in the array of '_links' in the resource
    const resourceLink = resource._links.find(link => link.rel === rel);
    if (!resourceLink) {
      // no resource link found
      return null;
    }
    return resourceLink.href;
  }
}
