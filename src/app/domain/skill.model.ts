import { Resource } from '@lib/hateoas';

export interface SkillData {
  name: string;
  description: string;
}

export interface Skill extends Resource, SkillData {
}
