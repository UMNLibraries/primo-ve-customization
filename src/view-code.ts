export const View = {
  CROOKSTON: "01UMN_INST:CROOKSTON",
  DULUTH: "01UMN_INST:DULUTH",
  MORRIS: "01UMN_INST:MORRIS",
  TWINCITIES: "01UMN_INST:TWINCITIES",
} as const;

export type ViewCode = typeof View[keyof typeof View];
