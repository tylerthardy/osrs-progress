import { Skill } from './skill.enum';

export class HiscoreSkill {
  public skill: Skill;
  public rank: number;
  public level: number;
  public xp?: number;
  public percent?: number;

  constructor(skill: Skill, csv: string) {
    const tokens = csv.split(',');
    const rank = parseInt(tokens[0], 10);
    const level = parseInt(tokens[1], 10);
    const xp = tokens.length > 2 ? parseInt(tokens[2], 10) : null;

    this.skill = skill;
    this.rank = rank;
    this.level = level;
    this.xp = xp;

    if (skill.nonSkill) {
      this.xp = level;
    }
  }

  public getPercentCompleted(maxXp: number = Skill.MAX_XP) {
    let percent = (this.xp / maxXp) * 100;
    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }
}

export class HiscoreOverall extends HiscoreSkill {
  private allSkills: HiscoreSkill[];

  constructor(allSkills: HiscoreSkill[], csv: string) {
    super(Skill.Overall, csv);
    this.allSkills = allSkills;
    this.skill = Skill.Overall;
  }

  public getPercentCompleted(maxSkillXp: number) {
    let totalXp = 0;
    this.allSkills.forEach((skill) => {
      if (skill.skill === Skill.Overall || skill.skill.nonSkill) {
        return;
      }
      totalXp += skill.xp > maxSkillXp ? maxSkillXp : skill.xp;
    });
    const percent = totalXp / (Skill.NUMBER_OF_SKILLS * maxSkillXp);
    return percent * 100;
  }
}
