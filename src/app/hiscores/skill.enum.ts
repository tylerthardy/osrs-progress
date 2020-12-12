export class Skill {
    public static readonly MAX_XP = 13034431;
    public static readonly NUMBER_OF_SKILLS = 23;

    private static AllValues = {};
    public static AllSkills: Skill[] = [];

    static readonly Overall = new Skill('Overall', '#323232', null);
    static readonly Attack = new Skill('Attack', '#9b2007', null);
    static readonly Defence = new Skill('Defence', '#6277be', null);
    static readonly Strength = new Skill('Strength', '#04955a', null);
    static readonly Hitpoints = new Skill('Hitpoints', '#837e7e', null);
    static readonly Ranged = new Skill('Ranged', '#6d9017', null);
    static readonly Prayer = new Skill('Prayer', '#9f9323', null);
    static readonly Magic = new Skill('Magic', '#3250c1', null);
    static readonly Cooking = new Skill('Cooking', '#702386', null);
    static readonly Woodcutting = new Skill('Woodcutting', '#348c25', null);
    static readonly Fletching = new Skill('Fletching', '#038d7d', null);
    static readonly Fishing = new Skill('Fishing', '#6a84a4', null);
    static readonly Firemaking = new Skill('Firemaking', '#bd7819', null);
    static readonly Crafting = new Skill('Crafting', '#976e4d', null);
    static readonly Smithing = new Skill('Smithing', '#6c6b52', null);
    static readonly Mining = new Skill('Mining', '#5d8fa7', null);
    static readonly Herblore = new Skill('Herblore', '#078509', null);
    static readonly Agility = new Skill('Agility', '#3a3c89', null);
    static readonly Thieving = new Skill('Thieving', '#6c3457', null);
    static readonly Slayer = new Skill('Slayer', '#646464', null);
    static readonly Farming = new Skill('Farming', '#65983f', null);
    static readonly Runecraft = new Skill('Runecraft', '#aa8d1a', null);
    static readonly Hunter = new Skill('Hunter', '#5c5941', null);
    static readonly Construction = new Skill('Construction', '#82745f', null);
    static readonly BOUNTY_HUNTER_HUNTER = new Skill('Bounty Hunter - Hunter', null, null, true);
    static readonly BOUNTY_HUNTER_ROGUE = new Skill('Bounty Hunter - Rogue', null, null, true);
    static readonly LAST_MAN_STANDING = new Skill('Last Man Standing', null, null, true);
    static readonly CLUE_SCROLLS_ALL = new Skill('Clue Scrolls (all)', null, null, true);
    static readonly CLUE_SCROLLS_BEGINNER = new Skill('Clue Scrolls (beginner)', null, null, true);
    static readonly CLUE_SCROLLS_EASY = new Skill('Clue Scrolls (easy)', null, null, true);
    static readonly CLUE_SCROLLS_MEDIUM = new Skill('Clue Scrolls (medium)', null, null, true);
    static readonly CLUE_SCROLLS_HARD = new Skill('Clue Scrolls (hard)', null, null, true);
    static readonly CLUE_SCROLLS_ELITE = new Skill('Clue Scrolls (elite)', null, null, true);
    static readonly CLUE_SCROLLS_MASTER = new Skill('Clue Scrolls (master)', null, null, true);

    private constructor(
        public readonly Name: string,
        public readonly Color?: string,
        public readonly Icon?: string,
        public readonly nonSkill: boolean = false) {
            Skill.AllValues[Name] = this;
            Skill.AllSkills.push(this);
        }

    public static parseEnum(data: string): Skill {
        return Skill.AllValues[data];
    }
}
