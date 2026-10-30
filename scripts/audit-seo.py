from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
import json,collections
ORIGIN='https://www.hithobe.com'
LOCALES=['th','en','ar','fr','bn','ha','sw','so','ur']
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.schemas=[];self.in_schema=False;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append((tag,a));self.in_schema=tag=='script' and a.get('type')=='application/ld+json'
 def handle_endtag(self,tag):
  if tag=='script':self.in_schema=False
 def handle_data(self,data):
  if self.in_schema:self.schemas.append(json.loads(data))
 def metas(self,key):return [a['content'] for t,a in self.tags if t=='meta' and (a.get('name')==key or a.get('property')==key)]
 def links(self,rel):return [a for t,a in self.tags if t=='link' and a.get('rel')==rel]
pages={};descriptions=collections.defaultdict(list);indexable=set();titles=collections.defaultdict(list)
for file in Path('dist').rglob('index.html'):
 route='/'+str(file.parent.relative_to('dist'));route='/' if route=='/.' else route
 p=Page(file.read_text());canonical=p.links('canonical');assert len(canonical)==1,(route,'canonical count')
 url=canonical[0]['href'];assert url.startswith(ORIGIN+'/') and '?' not in url and '#' not in url
 assert urlparse(url).path.rstrip('/')==route.rstrip('/'),(route,url)
 for key in ['description','robots','og:title','og:description','og:url','og:type','og:image','og:image:alt','og:image:width','og:image:height','og:locale','og:site_name','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt']:
  assert len(p.metas(key))==1 and p.metas(key)[0].strip(),(route,key,p.metas(key))
 assert p.metas('og:url')==[url];assert p.metas('description')==p.metas('og:description')==p.metas('twitter:description')
 assert p.metas('og:title')==p.metas('twitter:title');assert '{fabric' not in p.metas('description')[0]
 assert Path('dist'+urlparse(p.metas('og:image')[0]).path).is_file()
 descriptions[p.metas('description')[0]].append(route);titles[p.metas('og:title')[0]].append(route)
 assert p.schemas,(route,'missing schema')
 webpage=next(s for s in p.schemas if s.get('@type') in ['WebPage','AboutPage','ContactPage']);assert webpage['url']==url
 for schema in p.schemas:
  assert schema.get('@type')!='HowTo',(route,'unsupported legacy HowTo')
  if schema.get('@type')=='Product':assert not any(k in schema for k in ['offers','aggregateRating','review'])
 if 'noindex' not in p.metas('robots')[0]:indexable.add(url)
 else:assert route.endswith('/checkout') and not p.links('alternate'),route
 pages[url]=p
for url in indexable:
 p=pages[url];alts={a['hreflang']:a['href'] for a in p.links('alternate')};assert set(alts)==set(LOCALES+['x-default'])
 language=next(a['lang'] for t,a in p.tags if t=='html');assert alts[language]==url;assert alts['x-default']==alts['en']
 for alt in alts.values():
  assert alt in pages and alt in indexable,(url,alt)
  other={a['hreflang']:a['href'] for a in pages[alt].links('alternate')};assert other==alts,(url,alt,'non-reciprocal')
xml=ET.parse('dist/sitemap.xml');locations={node.text for node in xml.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')};assert locations==indexable,(len(locations),len(indexable))
assert not [v for v in titles.values() if len(v)>1],[(k,v) for k,v in titles.items() if len(v)>1]
assert not [v for v in descriptions.values() if len(v)>1],[(k,v) for k,v in descriptions.items() if len(v)>1]
print(f'SEO audit passed: {len(pages)} pages, {len(indexable)} self-canonical indexable URLs, reciprocal 9-language clusters, complete social tags and unique descriptions')
