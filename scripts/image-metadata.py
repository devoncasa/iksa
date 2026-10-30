"""Record real intrinsic sizes and responsive candidates for local hithobe photographs."""
from pathlib import Path
from PIL import Image
import json,re
root=Path(__file__).resolve().parents[1]
files={}
for path in sorted((root/'public/images/hithobe').rglob('*.webp')):
 with Image.open(path) as image:
  image.verify()
 with Image.open(path) as image:
  files['/'+path.relative_to(root/'public').as_posix()]={'width':image.width,'height':image.height}
for src,entry in files.items():
 match=re.match(r'(.+)-(480|640|800|1120|1280)\.webp$',src)
 if match:
  variants=[(p,d) for p,d in files.items() if re.match(re.escape(match[1])+r'-(480|640|800|1120|1280)\.webp$',p)]
  entry['srcSet']=', '.join(f'{p} {d["width"]}w' for p,d in sorted(variants,key=lambda pair:pair[1]['width']))
(root/'data/image-metadata.json').write_text(json.dumps(files,indent=2)+'\n')
print(f'Validated dimensions for {len(files)} local WebP files')
