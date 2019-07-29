import { Skill } from './skill.enum';

export interface HiscoreSkill {
    Skill: Skill;
    Rank: Number;
    Level: Number;
    Xp?: Number;
    Percent?: Number;
}
