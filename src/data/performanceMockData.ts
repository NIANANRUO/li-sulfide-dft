export const sampleNames = ["SAC-FeN4", "DAC-CoFe", "TiO2-x", "Ti3C2O2"];

export const adsorptionEnergyData = [
  { species: "Li2S8", "SAC-FeN4": -1.35, "DAC-CoFe": -1.52, "TiO2-x": -1.72, "Ti3C2O2": -1.41 },
  { species: "Li2S6", "SAC-FeN4": -1.58, "DAC-CoFe": -1.76, "TiO2-x": -1.88, "Ti3C2O2": -1.63 },
  { species: "Li2S4", "SAC-FeN4": -1.82, "DAC-CoFe": -2.05, "TiO2-x": -2.13, "Ti3C2O2": -1.91 },
  { species: "Li2S2", "SAC-FeN4": -2.05, "DAC-CoFe": -2.22, "TiO2-x": -2.36, "Ti3C2O2": -2.12 },
  { species: "Li2S", "SAC-FeN4": -1.92, "DAC-CoFe": -2.1, "TiO2-x": -2.18, "Ti3C2O2": -1.96 }
];

export const freeEnergyData = {
  "SAC-FeN4": [
    { step: "S8", energy: 0 },
    { step: "Li2S8", energy: -0.32 },
    { step: "Li2S6", energy: -0.54 },
    { step: "Li2S4", energy: -0.86 },
    { step: "Li2S2", energy: -0.42 },
    { step: "Li2S", energy: -0.74 }
  ],
  "DAC-CoFe": [
    { step: "S8", energy: 0 },
    { step: "Li2S8", energy: -0.44 },
    { step: "Li2S6", energy: -0.73 },
    { step: "Li2S4", energy: -1.02 },
    { step: "Li2S2", energy: -0.78 },
    { step: "Li2S", energy: -1.08 }
  ],
  "TiO2-x": [
    { step: "S8", energy: 0 },
    { step: "Li2S8", energy: -0.28 },
    { step: "Li2S6", energy: -0.58 },
    { step: "Li2S4", energy: -0.9 },
    { step: "Li2S2", energy: -0.38 },
    { step: "Li2S", energy: -0.88 }
  ]
};

export const cyclingData = Array.from({ length: 11 }, (_, i) => ({
  cycle: i * 50,
  "SAC-FeN4": 1180 - i * 32,
  "DAC-CoFe": 1240 - i * 24,
  "TiO2-x": 1100 - i * 38,
  CE: 98.2 + Math.min(i * 0.12, 1.2)
}));

export const rateData = [
  { rate: "0.1C", "SAC-FeN4": 1320, "DAC-CoFe": 1390, "TiO2-x": 1250 },
  { rate: "0.2C", "SAC-FeN4": 1210, "DAC-CoFe": 1280, "TiO2-x": 1130 },
  { rate: "0.5C", "SAC-FeN4": 1040, "DAC-CoFe": 1130, "TiO2-x": 960 },
  { rate: "1C", "SAC-FeN4": 890, "DAC-CoFe": 990, "TiO2-x": 790 },
  { rate: "2C", "SAC-FeN4": 720, "DAC-CoFe": 830, "TiO2-x": 620 },
  { rate: "0.2C", "SAC-FeN4": 1190, "DAC-CoFe": 1270, "TiO2-x": 1100 }
];

export const cvData = Array.from({ length: 41 }, (_, i) => {
  const v = 1.7 + i * 0.025;
  return {
    voltage: Number(v.toFixed(2)),
    cathodic: Number((-1.8 * Math.exp(-Math.pow((v - 2.05) / 0.09, 2)) - 0.9 * Math.exp(-Math.pow((v - 2.28) / 0.08, 2))).toFixed(2)),
    anodic: Number((1.5 * Math.exp(-Math.pow((v - 2.38) / 0.09, 2)) + 0.95 * Math.exp(-Math.pow((v - 2.48) / 0.07, 2))).toFixed(2))
  };
});

export const eisData = Array.from({ length: 18 }, (_, i) => ({
  zre: i * 7 + 6,
  "SAC-FeN4": Math.max(2, 48 * Math.sin((i / 17) * Math.PI)),
  "DAC-CoFe": Math.max(1.5, 38 * Math.sin((i / 17) * Math.PI)),
  "TiO2-x": Math.max(3, 62 * Math.sin((i / 17) * Math.PI))
}));

export const dischargeCurveData = Array.from({ length: 31 }, (_, i) => ({
  capacity: i * 45,
  voltage: Number((2.42 - 0.00055 * i * 45 - (i > 14 ? 0.18 : 0)).toFixed(3))
}));

export const lisNucleationData = Array.from({ length: 24 }, (_, i) => ({
  time: i * 5,
  "SAC-FeN4": Number((0.18 + 0.09 * Math.log(i + 1)).toFixed(2)),
  "DAC-CoFe": Number((0.24 + 0.12 * Math.log(i + 1)).toFixed(2)),
  "TiO2-x": Number((0.14 + 0.075 * Math.log(i + 1)).toFixed(2))
}));
