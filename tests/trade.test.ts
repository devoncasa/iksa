import test from 'node:test';
import assert from 'node:assert/strict';
import {tradeEstimate} from '../lib/trade.ts';
test('roll yields do not pool remnants and weights use actual width',()=>{
 const r=tradeEstimate(22.86,147.32,130,10,3.66,3,6)!;
 assert.equal(r.garmentsPerRoll,6);assert.equal(r.garments,60);
 assert.ok(Math.abs(r.netKg-43.7805576)<1e-6);
 assert.ok(Math.abs(r.grossKg-r.netKg-6)<1e-8);
});
test('invalid or incomplete assumptions produce no misleading estimate',()=>{
 for(const rolls of [0,-1,1.5,NaN,Infinity]) assert.equal(tradeEstimate(23,150,130,rolls,3.66,0,6),null);
 assert.equal(tradeEstimate(23,150,130,1,0,0,6),null);
 assert.equal(tradeEstimate(23,150,130,1,3.66,100,6),null);
});
test('exact cuts and a roll shorter than one garment',()=>{
 assert.equal(tradeEstimate(20,150,130,2,4,0,0)!.garments,10);
 assert.equal(tradeEstimate(2,150,130,2,4,0,0)!.garments,0);
});
