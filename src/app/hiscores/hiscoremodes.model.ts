export class HiscoreMode {
    public constructor(public readonly name: string, public readonly slug: any) {}
}

export class HiscoreModes {
    static readonly STANDARD = new HiscoreMode('Standard', 'hiscore_oldschool');
    static readonly IRONMAN = new HiscoreMode('Ironman', 'hiscore_oldschool_ironman');
    static readonly ULTIMATE = new HiscoreMode('Ultimate', 'hiscore_oldschool_ultimate');
    static readonly HARDCORE = new HiscoreMode('Hardcore', 'hiscore_oldschool_hardcore_ironman');
    static readonly DEADMAN = new HiscoreMode('Deadman', 'hiscore_oldschool_deadman');
    static readonly SEASONAL = new HiscoreMode('Seasonal', 'hiscore_oldschool_seasonal');
    static readonly TOURNAMENT = new HiscoreMode('Tournament', 'hiscore_oldschool_tournament');

    public static getModeNames(): string[] {
        return Object.keys(this).map(key => this[key].name);
    }
    public static getAll(): HiscoreMode[] {
        return Object.keys(this).map(key => this[key]);
    }
}
