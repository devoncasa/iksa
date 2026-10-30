import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('30 distinct gallery assets have complete responsive variants',()=>{
 const shots=JSON.parse(readFileSync('data/editorial-images.json','utf8'));
 assert.equal(shots.length,30);assert.equal(new Set(shots.map(s=>s.id)).size,30);
 for(const shot of shots)for(const width of [480,800,1280])assert.ok(existsSync(`public/images/hithobe/editorial/${shot.id}-${width}.webp`));
});
test('responsive descriptors agree with recorded pixel widths and retain real ratios',()=>{
 const files=JSON.parse(readFileSync('data/image-metadata.json','utf8'));
 for(const [src,data] of Object.entries(files) as [string,{width:number;height:number;srcSet?:string}][]){
  assert.ok(data.width>0&&data.height>0,src);
  const bytes=readFileSync(`public${src}`);assert.ok(bytes.length>0,src);
  assert.equal(bytes.toString('ascii',0,4),'RIFF',src);assert.equal(bytes.toString('ascii',8,12),'WEBP',src);
  for(const candidate of data.srcSet?.split(', ')??[]){const [path,width]=candidate.split(' ');assert.equal(parseInt(width),files[path].width,path);}
 }
 assert.ok(files['/images/hithobe/editorial/thobe-saudi-1280.webp'].height>files['/images/hithobe/editorial/thobe-saudi-1280.webp'].width);
});
