export class Color {
    constructor(
        public r: Number,
        public b: Number,
        public g: Number,
        public a?: Number
    ) { }

    public getHexColor(): string {
        return "#" +
                this.a ? this.intToHex(this.a) : "" +
                this.intToHex(this.r) +
                this.intToHex(this.g) +
                this.intToHex(this.b);
    }

    private intToHex(i: Number): string {
        let hex = Number(i).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
    }
}
        