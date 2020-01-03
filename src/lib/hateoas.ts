/*****************************************************************************
 * This file contains types/helpers/converters/... used to work with hateoas
 * related matters.
 *****************************************************************************/

/**
 * The resource id type.
 */
export type ResourceId = number | string;

/**
 * A Resource from the server (an Activity, a Skill,...) has always an id and hateoas links.
 */
export interface Resource {
  id: ResourceId;
  _links?: { rel: string, href: string }[];
}
