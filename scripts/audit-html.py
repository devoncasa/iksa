from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse,unquote
from collections import defaultdict
from PIL import Image
import json
metadata=json.loads(Path("data/image-metadata.json").read_text())
for src,data in metadata.items():
 with Image.open(Path("dist",src[1:])) as image:
  image.load()
  assert (image.width,image.height)==(data["width"],data["height"]),src
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.title='';self.intitle=False;self.h1=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs);self.tags.append((tag,attrs))
  if tag=='title':self.intitle=True
  if tag=='h1':self.h1+=1
 def handle_endtag(self,tag):
  if tag=='title':self.intitle=False
 def handle_data(self,data):
  if self.intitle:self.title+=data
errors=[];titles=defaultdict(list);count=0
for path in Path('dist').rglob('index.html'):
 count+=1;page=Page(path.read_text());route='/'+str(path.parent.relative_to('dist'));route='/' if route=='/.' else route
 titles[page.title].append(route)
 canonical=[a for t,a in page.tags if t=='link' and a.get('rel')=='canonical'];alternates=[a for t,a in page.tags if t=='link' and a.get('hreflang')]
 for what,n,expected in [('canonical',len(canonical),1),('alternates',len(alternates),0 if route.endswith('/checkout') else 10),('h1',page.h1,1)]:
  if n!=expected:errors.append([route,what,n])
 for tag,a in page.tags:
  if tag=='img':
   src=a.get('src','')
   if not src:errors.append([route,'empty src'])
   if src.startswith('/') and not Path('dist',src[1:]).exists():errors.append([route,'missing image',src])
   if src in metadata:
    data=metadata[src]
    if (a.get('width'),a.get('height'))!=(str(data['width']),str(data['height'])):errors.append([route,'wrong image dimensions',src])
   for candidate in a.get('srcset','').split(', '):
    fields=candidate.split()
    if len(fields)==2 and fields[0] in metadata and fields[1].endswith('w'):
     if int(fields[1][:-1])!=metadata[fields[0]]['width']:errors.append([route,'wrong responsive width',candidate])
  if tag=='a':
   href=a.get('href','')
   if href.startswith('mailto:') or any(x in href for x in ['facebook.com','instagram.com','tiktok.com']):errors.append([route,'prohibited link',href])
   if href.startswith('/') and not href.startswith('//'):
    target=unquote(urlparse(href).path).strip('/')
    if not(Path('dist',target).is_file() or Path('dist',target,'index.html').exists()):errors.append([route,'broken page',href])
print('Rendered HTML pages:',count);print('Issues:',len(errors));print(errors[:35]);print('Duplicate titles:',[(t,v) for t,v in titles.items() if len(v)>1][:8])
if errors:raise SystemExit(1)
