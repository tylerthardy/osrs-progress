import { Color } from "../color/color";

interface EnumIdentity { }
export class Skill implements EnumIdentity {
    public static readonly MAX_XP = 13034431;
    public static readonly NUMBER_OF_SKILLS = 23;

    private static AllValues = {};
    public static AllSkills: Skill[] = [];

    static readonly Overall = new Skill("Overall", new Color(50, 50, 50), null);
    static readonly Attack = new Skill("Attack", new Color(155, 32, 7), null);
    static readonly Defence = new Skill("Defence", new Color(98, 119, 190), null);
    static readonly Strength = new Skill("Strength", new Color(4, 149, 90), null);
    static readonly Hitpoints = new Skill("Hitpoints", new Color(131, 126, 126), null);
    static readonly Ranged = new Skill("Ranged", new Color(109, 144, 23), null);
    static readonly Prayer = new Skill("Prayer", new Color(159, 147, 35), null);
    static readonly Magic = new Skill("Magic", new Color(50, 80, 193), null);
    static readonly Cooking = new Skill("Cooking", new Color(112, 35, 134), null);
    static readonly Woodcutting = new Skill("Woodcutting", new Color(52, 140, 37), null);
    static readonly Fletching = new Skill("Fletching", new Color(3, 141, 125), null);
    static readonly Fishing = new Skill("Fishing", new Color(106, 132, 164), null);
    static readonly Firemaking = new Skill("Firemaking", new Color(189, 120, 25), null);
    static readonly Crafting = new Skill("Crafting", new Color(151, 110, 77), null);
    static readonly Smithing = new Skill("Smithing", new Color(108, 107, 82), null);
    static readonly Mining = new Skill("Mining", new Color(93, 143, 167), null);
    static readonly Herblore = new Skill("Herblore", new Color(7, 133, 9), null);
    static readonly Agility = new Skill("Agility", new Color(58, 60, 137), null);
    static readonly Thieving = new Skill("Thieving", new Color(108, 52, 87), null);
    static readonly Slayer = new Skill("Slayer", new Color(100, 100, 100), null);
    static readonly Farming = new Skill("Farming", new Color(101, 152, 63), null);
    static readonly Runecraft = new Skill("Runecraft", new Color(170, 141, 26), null);
    static readonly Hunter = new Skill("Hunter", new Color(92, 89, 65), null);
    static readonly Construction = new Skill("Construction", new Color(130, 116, 95), null);
    static readonly Bounty_Hunter_Hunter = new Skill("Bounty Hunter - Hunter", null, null);
    static readonly Bounty_Hunter_Rogue = new Skill("Bounty Hunter - Rogue", null, null);
    static readonly Last_Man_Standing = new Skill("Last Man Standing", null, null);
    static readonly Clue_Scrolls_all = new Skill("Clue Scrolls (all)", null, null);
    static readonly Clue_Scrolls_beginner = new Skill("Clue Scrolls (beginner)", null, null);
    static readonly Clue_Scrolls_easy = new Skill("Clue Scrolls (easy)", null, null);
    static readonly Clue_Scrolls_medium = new Skill("Clue Scrolls (medium)", null, null);
    static readonly Clue_Scrolls_hard = new Skill("Clue Scrolls (hard)", null, null);
    static readonly Clue_Scrolls_elite = new Skill("Clue Scrolls (elite)", null, null);
    static readonly Clue_Scrolls_master = new Skill("Clue Scrolls (master)", null, null);

    public Color: string;
    private constructor(
        public readonly Name: string,
        private readonly color?: Color,
        public readonly Icon?: string) {
            this.Color = color ? color.toHex() : null;
            Skill.AllValues[Name] = this;
            Skill.AllSkills.push(this);
        }

    public static parseEnum(data: string): Skill {
        return Skill.AllValues[data];
    }
}