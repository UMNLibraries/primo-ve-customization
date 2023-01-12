import colorTheme from "./colors.json" assert { type: "json" };

const convertible = {
  toSass: function () {
    return Object.entries(this).reduce(
      (sass, entry) => sass + `$${entry.join(": ")};`,
      ""
    );
  },
};

/**
 * Defines a common set of color variables that can be shared between
 * JS/TS and Sass/SCSS. Includes Primo's built-in color theme variables
 * (defined in colors.json) and any additional custom color variables.
 */
export default {
  __proto__: convertible,
  ...colorTheme,
  maroon: "#7a0019",
  darkMaroon: "#5b0013",
  lightMaroon: "#900021",
  gold: "#ffcc33",
  lightGold: "#ffde7a",
  darkGold: "#ffb71e",
  darkerGrey: "#333333",
  darkGrey: "#5a5a5a",
  mediumGrey: "#777677",
  lightGrey: "#d5d6d2",
  lighterGrey: "#f0efee",
  offWhite: "#f9f7f6",
};
