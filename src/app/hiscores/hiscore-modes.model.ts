export class HiscoreMode {
  public constructor(public readonly name: string, public readonly slug: any) {}
}

export class HiscoreModes {
  static readonly STANDARD = new HiscoreMode('Standard', 'normal');
  static readonly IRONMAN = new HiscoreMode('Ironman', 'ironman');
  static readonly ULTIMATE = new HiscoreMode('Ultimate', 'ultimate');
  static readonly HARDCORE = new HiscoreMode('Hardcore', 'hardcore_ironman');
  static readonly DEADMAN = new HiscoreMode('Deadman', 'deadman');
  static readonly SEASONAL = new HiscoreMode('Seasonal', 'seasonal');
  static readonly TOURNAMENT = new HiscoreMode('Tournament', 'tournament');

  public static getModeNames(): string[] {
    return Object.keys(this).map((key) => this[key].name);
  }
  public static getAll(): HiscoreMode[] {
    return Object.keys(this).map((key) => this[key]);
  }
}
