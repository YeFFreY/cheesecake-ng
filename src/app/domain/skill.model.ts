import { Resource } from '../../lib/hateoas';

export interface SkillDetails {
  name: string;
  description: string;
}

export interface Skill extends Resource, SkillDetails {
}
