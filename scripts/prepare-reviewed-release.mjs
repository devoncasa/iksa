import {readFileSync,writeFileSync,existsSync,rmSync,mkdtempSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(readFileSync(join(root,'release/manifest.json'),'utf8'));
const hash=value=>createHash('sha256').update(value).digest('hex');
const chunks=manifest.parts.map(part=>{
 const data=readFileSync(join(root,'release/artifact.part-'+String(part.index).padStart(3,'0')));
 if(hash(data)!==part.sha256)throw Error('Release part checksum mismatch');
 return data;
});
const archive=Buffer.concat(chunks);
if(archive.length!==manifest.archive_bytes||hash(archive)!==manifest.archive_sha256)throw Error('Release checksum mismatch');
const temp=mkdtempSync(join(tmpdir(),'hithobe-release-'));
try {
 const file=join(temp,'site.tar.gz');writeFileSync(file,archive);
 const names=execFileSync('tar',['-tzf',file],{encoding:'utf8'}).trim().split('\n');
 if(names.some(name=>!name.startsWith('dist/')||name.split('/').includes('..')))throw Error('Invalid release paths');
 rmSync(join(root,'dist'),{recursive:true,force:true});
 execFileSync('tar',['-xzf',file,'-C',root],{stdio:'inherit'});
 for(const path of ['dist/index.html','dist/th/index.html','dist/contact/index.html','dist/sitemap.xml','dist/robots.txt','dist/__forms.html'])if(!existsSync(resolve(root,path)))throw Error('Missing release output '+path);
 const html=readFileSync(join(root,'dist/index.html'),'utf8');
 if(html.includes('Private preview')||!html.includes('hero-title-first')||!html.includes('site-footer-wordmark'))throw Error('Wrong release output');
 const brand=manifest.brand_stylesheet;
 if(brand.file!=='brand-finishing-v1.css')throw Error('Invalid stylesheet supplement');
 const css=readFileSync(join(root,'release',brand.file));
 if(hash(css)!==brand.sha256)throw Error('Stylesheet supplement checksum mismatch');
 writeFileSync(join(root,'dist',brand.file),css);
 for(const path of readdirSync(join(root,'dist'),{recursive:true})){
  if(!path.endsWith('.html'))continue;
  const file=join(root,'dist',path);const page=readFileSync(file,'utf8');
  if(page.includes('</head>')&&!page.includes('/'+brand.file))writeFileSync(file,page.replace('</head>','<link rel="stylesheet" href="/'+brand.file+'"></head>'));
 }
 console.log('Verified hithobe release',manifest.source_commit,manifest.archive_sha256,manifest.file_count,'files');
} finally {rmSync(temp,{recursive:true,force:true});}
