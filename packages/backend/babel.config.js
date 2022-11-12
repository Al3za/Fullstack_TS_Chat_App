module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

/// babel gör så att jest kan tolka typeScript test, för jest förstår bara vanligt Js kod;
