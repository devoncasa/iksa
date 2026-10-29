export function tradeEstimate(length: number, widthCm: number, gsm: number, rolls: number, cut: number, allowance: number, packing: number) {
  const values = [length,widthCm,gsm,rolls,cut,allowance,packing];
  if (values.some(v=>!Number.isFinite(v)) || length<=0 || widthCm<=0 || gsm<=0 || cut<=0 || rolls<1 || !Number.isInteger(rolls) || allowance<0 || allowance>=100 || packing<0) return null;
  const usable = length*(1-allowance/100);
  const garmentsPerRoll = Math.floor((usable+1e-9)/cut);
  const netKg = length*widthCm/100*gsm/1000*rolls;
  return {garmentsPerRoll,garments:garmentsPerRoll*rolls,remaining:Math.max(0,usable-garmentsPerRoll*cut)*rolls,utilisation:garmentsPerRoll*cut/length*100,glm:widthCm/100*gsm,netKg,grossKg:netKg+packing};
}
