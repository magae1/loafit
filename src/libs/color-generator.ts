class ColorGenerator {
  private str: string;
  constructor(str: string) {
    this.str = str;
  }

  toHex() {
    var hash = 0;
    if (this.str.length === 0) return hash;
    for (var i = 0; i < this.str.length; i++) {
      hash = this.str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }
  toRGB() {
    var hash = 0;
    if (this.str.length === 0) return hash;
    for (var i = 0; i < this.str.length; i++) {
      hash = this.str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 255;
      rgb[i] = value;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
}

export default ColorGenerator;
