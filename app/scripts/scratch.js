function registerExtension(extension){
  var infos = extension.getInfo();
  var data = {"ext_name":infos.name,"ext_id":infos.id,"ext_description":"","ext_creator":"","ext_creator_url_suffix":"","ext_file_name":"none","ext_icon":true,"icon":"colors"}
  if (infos.color1) data.ext_color1 = infos.color1;
  if (infos.color2) data.ext_color2 = infos.color2;
  if (infos.color3) data.ext_color3 = infos.color3;
  setBasicSettings(data);
}

class Scratch_{
  constructor (){
    this.ArgumentType = {
      ANGLE: "angle",
      BOOLEAN: "Boolean",
      COLOR: "color",
      NUMBER: "number",
      STRING: "string",
      MATRIX: "matrix",
      NOTE: "note",
      IMAGE: "image",
      COSTUME: "costume",
      SOUND: "sound"
    };

    this.BlockType = {
      BOOLEAN: "Boolean",
      BUTTON: "button",
      LABEL: "label",
      COMMAND: "command",
      CONDITIONAL: "conditional",
      EVENT: "event",
      HAT: "hat",
      LOOP: "loop",
      REPORTER: "reporter",
      XML: "xml"
    };

    this.BlockShape = {HEXAGONAL: 1, ROUND: 2, SQUARE: 3};

    this.Cast = (() => {
      class Color {
        /**
         * @typedef {object} RGBObject - An object representing a color in RGB format.
         * @property {number} r - the red component, in the range [0, 255].
         * @property {number} g - the green component, in the range [0, 255].
         * @property {number} b - the blue component, in the range [0, 255].
         */

        /**
         * @typedef {object} HSVObject - An object representing a color in HSV format.
         * @property {number} h - hue, in the range [0-359).
         * @property {number} s - saturation, in the range [0,1].
         * @property {number} v - value, in the range [0,1].
         */

        /** @type {RGBObject} */
        get RGB_BLACK () {
          return {r: 0, g: 0, b: 0};
        }

        /** @type {RGBObject} */
        get RGB_WHITE () {
          return {r: 255, g: 255, b: 255};
        }

        /**
         * Convert a Scratch decimal color to a hex string, #RRGGBB.
         * @param {number} decimal RGB color as a decimal.
         * @return {string} RGB color as #RRGGBB hex string.
         */
        decimalToHex (decimal) {
          if (decimal < 0) {
            decimal += 0xFFFFFF + 1;
          }
          let hex = Number(decimal).toString(16);
          hex = `#${'000000'.substr(0, 6 - hex.length)}${hex}`;
          return hex;
        }

        /**
         * Convert a Scratch decimal color to an RGB color object.
         * @param {number} decimal RGB color as decimal.
         * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         */
        decimalToRgb (decimal) {
          const a = (decimal >> 24) & 0xFF;
          const r = (decimal >> 16) & 0xFF;
          const g = (decimal >> 8) & 0xFF;
          const b = decimal & 0xFF;
          return {r: r, g: g, b: b, a: a > 0 ? a : 255};
        }

        /**
         * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
         * CC-BY-SA Tim Down:
         * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
         * @param {!string} hex Hex representation of the color.
         * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         */
        hexToRgb (hex) {
          const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : null;
        }

        /**
         * Convert an RGB color object to a hex color.
         * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         * @return {!string} Hex representation of the color.
         */
        rgbToHex (rgb) {
          return Color.decimalToHex(Color.rgbToDecimal(rgb));
        }

        /**
         * Convert an RGB color object to a Scratch decimal color.
         * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         * @return {!number} Number representing the color.
         */
        rgbToDecimal (rgb) {
          return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
        }

        /**
        * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
        * @param {!string} hex Hex representation of the color.
        * @return {!number} Number representing the color.
        */
        hexToDecimal (hex) {
          return Color.rgbToDecimal(Color.hexToRgb(hex));
        }

        /**
         * Convert an HSV color to RGB format.
         * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
         * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         */
        hsvToRgb (hsv) {
          let h = hsv.h % 360;
          if (h < 0) h += 360;
          const s = Math.max(0, Math.min(hsv.s, 1));
          const v = Math.max(0, Math.min(hsv.v, 1));

          const i = Math.floor(h / 60);
          const f = (h / 60) - i;
          const p = v * (1 - s);
          const q = v * (1 - (s * f));
          const t = v * (1 - (s * (1 - f)));

          let r;
          let g;
          let b;

          switch (i) {
          default:
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
          }

          return {
            r: Math.floor(r * 255),
            g: Math.floor(g * 255),
            b: Math.floor(b * 255)
          };
        }

        /**
         * Convert an RGB color to HSV format.
         * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
         * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
         */
        rgbToHsv (rgb) {
          const r = rgb.r / 255;
          const g = rgb.g / 255;
          const b = rgb.b / 255;
          const x = Math.min(Math.min(r, g), b);
          const v = Math.max(Math.max(r, g), b);

          // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate
          let h = 0;
          let s = 0;
          if (x !== v) {
            const f = (r === x) ? g - b : ((g === x) ? b - r : r - g);
            const i = (r === x) ? 3 : ((g === x) ? 5 : 1);
            h = ((i - (f / (v - x))) * 60) % 360;
            s = (v - x) / v;
          }

          return {h: h, s: s, v: v};
        }

        /**
         * Linear interpolation between rgb0 and rgb1.
         * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
         * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
         * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
         * @return {RGBObject} the interpolated color.
         */
        mixRgb (rgb0, rgb1, fraction1) {
          if (fraction1 <= 0) return rgb0;
          if (fraction1 >= 1) return rgb1;
          const fraction0 = 1 - fraction1;
          return {
            r: (fraction0 * rgb0.r) + (fraction1 * rgb1.r),
            g: (fraction0 * rgb0.g) + (fraction1 * rgb1.g),
            b: (fraction0 * rgb0.b) + (fraction1 * rgb1.b)
          };
        }
      }

      /**
       * @fileoverview
       * Utilities for casting and comparing Scratch data-types.
       * Scratch behaves slightly differently from JavaScript in many respects,
       * and these differences should be encapsulated below.
       * For example, in Scratch, add(1, join("hello", world")) -> 1.
       * This is because "hello world" is cast to 0.
       * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
       * Use when coercing a value before computation.
       */

      /**
       * Used internally by compare()
       * @param {*} val A value that evaluates to 0 in JS string-to-number conversation such as empty string, 0, or tab.
       * @returns {boolean} True if the value should not be treated as the number zero.
       */
      const isNotActuallyZero = val => {
        if (typeof val !== 'string') return false;
        for (let i = 0; i < val.length; i++) {
          const code = val.charCodeAt(i);
          // '0'.charCodeAt(0) === 48
          // '\t'.charCodeAt(0) === 9
          // We include tab for compatibility with scratch-www's broken trim() polyfill.
          // https://github.com/TurboWarp/scratch-vm/issues/115
          // https://scratch.mit.edu/projects/788261699/
          if (code === 48 || code === 9) {
            return false;
          }
        }
        return true;
      };

      class r {
        /**
         * Scratch cast to number.
         * Treats NaN as 0.
         * In Scratch 2.0, this is captured by `interp.numArg.`
         * @param {*} value Value to cast to number.
         * @return {number} The Scratch-casted number value.
         */
        toNumber (value) {
          // If value is already a number we don't need to coerce it with
          // Number().
          if (typeof value === 'number') {
            // Scratch treats NaN as 0, when needed as a number.
            // E.g., 0 + NaN -> 0.
            if (Number.isNaN(value)) {
              return 0;
            }
            return value;
          }
          const n = Number(value);
          if (Number.isNaN(n)) {
            // Scratch treats NaN as 0, when needed as a number.
            // E.g., 0 + NaN -> 0.
            return 0;
          }
          return n;
        }

        /**
         * Scratch cast to boolean.
         * In Scratch 2.0, this is captured by `interp.boolArg.`
         * Treats some string values differently from JavaScript.
         * @param {*} value Value to cast to boolean.
         * @return {boolean} The Scratch-casted boolean value.
         */
        toBoolean (value) {
          // Already a boolean?
          if (typeof value === 'boolean') {
            return value;
          }
          if (typeof value === 'string') {
            // These specific strings are treated as false in Scratch.
            if ((value === '') ||
              (value === '0') ||
              (value.toLowerCase() === 'false')) {
              return false;
            }
            // All other strings treated as true.
            return true;
          }
          // Coerce other values and numbers.
          return Boolean(value);
        }

        /**
         * Scratch cast to string.
         * @param {*} value Value to cast to string.
         * @return {string} The Scratch-casted string value.
         */
        toString (value) {
          return String(value);
        }

        /**
         * Cast any Scratch argument to an RGB color array to be used for the renderer.
         * @param {*} value Value to convert to RGB color array.
         * @return {Array.<number>} [r,g,b], values between 0-255.
         */
        toRgbColorList (value) {
          const color = Cast.toRgbColorObject(value);
          return [color.r, color.g, color.b];
        }

        /**
         * Cast any Scratch argument to an RGB color object to be used for the renderer.
         * @param {*} value Value to convert to RGB color object.
         * @return {RGBOject} [r,g,b], values between 0-255.
         */
        toRgbColorObject (value) {
          let color;
          if (typeof value === 'string' && value.substring(0, 1) === '#') {
            color = Color.hexToRgb(value);

            // If the color wasn't *actually* a hex color, cast to black
            if (!color) color = {r: 0, g: 0, b: 0, a: 255};
          } else {
            color = Color.decimalToRgb(Cast.toNumber(value));
          }
          return color;
        }

        /**
         * Determine if a Scratch argument is a white space string (or null / empty).
         * @param {*} val value to check.
         * @return {boolean} True if the argument is all white spaces or null / empty.
         */
        isWhiteSpace (val) {
          return val === null || (typeof val === 'string' && val.trim().length === 0);
        }

        /**
         * Compare two values, using Scratch cast, case-insensitive string compare, etc.
         * In Scratch 2.0, this is captured by `interp.compare.`
         * @param {*} v1 First value to compare.
         * @param {*} v2 Second value to compare.
         * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
         */
        compare (v1, v2) {
          let n1 = Number(v1);
          let n2 = Number(v2);
          if (n1 === 0 && isNotActuallyZero(v1)) {
            n1 = NaN;
          } else if (n2 === 0 && isNotActuallyZero(v2)) {
            n2 = NaN;
          }
          if (isNaN(n1) || isNaN(n2)) {
            // At least one argument can't be converted to a number.
            // Scratch compares strings as case insensitive.
            const s1 = String(v1).toLowerCase();
            const s2 = String(v2).toLowerCase();
            if (s1 < s2) {
              return -1;
            } else if (s1 > s2) {
              return 1;
            }
            return 0;
          }
          // Handle the special case of Infinity
          if (
            (n1 === Infinity && n2 === Infinity) ||
            (n1 === -Infinity && n2 === -Infinity)
          ) {
            return 0;
          }
          // Compare as numbers.
          return n1 - n2;
        }

        /**
         * Determine if a Scratch argument number represents a round integer.
         * @param {*} val Value to check.
         * @return {boolean} True if number looks like an integer.
         */
        isInt (val) {
          // Values that are already numbers.
          if (typeof val === 'number') {
            if (isNaN(val)) { // NaN is considered an integer.
              return true;
            }
            // True if it's "round" (e.g., 2.0 and 2).
            return val === Math.floor(val);
          } else if (typeof val === 'boolean') {
            // `True` and `false` always represent integer after Scratch cast.
            return true;
          } else if (typeof val === 'string') {
            // If it contains a decimal point, don't consider it an int.
            return val.indexOf('.') < 0;
          }
          return false;
        }

        get LIST_INVALID () {
          return 'INVALID';
        }

        get LIST_ALL () {
          return 'ALL';
        }

        /**
         * Compute a 1-based index into a list, based on a Scratch argument.
         * Two special cases may be returned:
         * LIST_ALL: if the block is referring to all of the items in the list.
         * LIST_INVALID: if the index was invalid in any way.
         * @param {*} index Scratch arg, including 1-based numbers or special cases.
         * @param {number} length Length of the list.
         * @param {boolean} acceptAll Whether it should accept "all" or not.
         * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
         */
        toListIndex (index, length, acceptAll) {
          if (typeof index !== 'number') {
            if (index === 'all') {
              return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
            }
            if (index === 'last') {
              if (length > 0) {
                return length;
              }
              return Cast.LIST_INVALID;
            } else if (index === 'random' || index === 'any') {
              if (length > 0) {
                return 1 + Math.floor(Math.random() * length);
              }
              return Cast.LIST_INVALID;
            }
          }
          index = Math.floor(Cast.toNumber(index));
          if (index < 1 || index > length) {
            return Cast.LIST_INVALID;
          }
          return index;
        }
      }

      return new r();
    })();

    this.TargetType = {SPRITE: 'sprite', STAGE: 'stage'};

    this.extensions = {
      unsandboxed: true,
      register: registerExtension,
    };

    for (var func of ['canFetch', 'canOpenWindow', 'canRedirect', 'canRecordAudio', 'canRecordVideo', 'canReadClipboard', 'canNotify', 'canGeolocate', 'canEmbed', 'canDownload']){
      this[func] = () => true;
    }
  }
}

window.Scratch = new Scratch_();
