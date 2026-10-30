from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
import collections,json
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.ancestors=[];self.nested=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  data=dict(attrs);self.tags.append((tag,data))
  if tag=='button' and 'a' in self.ancestors:self.nested+=1
  if tag not in ['img','input','meta','link','br','hr','source','wbr','area','base','embed','param','track']:self.ancestors.append(tag)
 def handle_endtag(self,tag):
  if tag in self.ancestors:
   i=len(self.ancestors)-1-self.ancestors[::-1].index(tag);self.ancestors=self.ancestors[:i]
pages={};incoming=collections.Counter();empty=0
for file in Path('dist').rglob('index.html'):
 route='/'+str(file.parent.relative_to('dist'));route='/' if route=='/.' else route
 p=Page(file.read_text());pages[route]=p;assert p.nested==0,(route,'nested interactive controls')
 ids=[a['id'] for t,a in p.tags if 'id' in a];assert len(ids)==len(set(ids)),(route,'duplicate id')
 main=[a for t,a in p.tags if t=='main'];assert len(main)==1 and main[0].get('id')=='main-content',(route,'main landmark')
 for t,a in p.tags:
  if t=='a' and a.get('href','').startswith('/'):
   path=unquote(urlparse(a['href']).path).rstrip('/') or '/';incoming[path]+=1
  if t=='img':assert 'alt' in a,(route,'missing alt')
for route,p in pages.items():
 if not route.endswith('/checkout'):assert incoming[route]>0,(route,'orphan indexable route')
for file in Path('dist').rglob('*'):
 if file.is_file():assert file.stat().st_size>0,('empty deployment file',str(file))
for lang in ['','th/','ar/','fr/','bn/','ha/','sw/','so/','ur/']:
 for route in ['about-us','for-artisans','collections','contact','trade-studio']:
  p=pages['/'+lang+route];assert not any(t=='link' and a.get('href')=='/images/hithobe/kandura-window-portrait-1120.webp' and a.get('rel')=='preload' for t,a in p.tags),(lang,route,'wrong homepage preload')
assert 'noindex' in Path('dist/404.html').read_text()
assert '/* /404.html 404' in Path('dist/_redirects').read_text()
assert '/en/* /:splat 301' in Path('dist/_redirects').read_text()
print(f'Release structure passed: {len(pages)} pages, no nested controls or duplicate IDs, no orphan indexable routes, no empty deployed files, reviewed preload/404/redirect rules')
