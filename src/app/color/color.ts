export class Color {
    constructor(
        public r: Number,
        public g: Number,
        public b: Number,
        public a?: Number
    ) { }

    public toHex(): string {
        let color: string = "#" +
            (this.a ? this.intToHex(this.a) : "") +
            this.intToHex(this.r) +
            this.intToHex(this.g) +
            this.intToHex(this.b);
        return color;
    }

    private intToHex(i: Number): string {
        let hex = Number(i).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
    }
}
        