import { Skill } from './skill.enum';

export interface HiscoreSkill {
    Skill: Skill;
    Rank: number;
    Level: number;
    Xp?: number;
    Percent?: number;
}
