"""Build the public demo from one approved catalogue; never changes Shopify resources."""
from pathlib import Path
import json, re, hashlib, html, copy, datetime

import argparse, sys
parser=argparse.ArgumentParser(description='Generate public product templates, translations and detail assets from the catalogue.')
parser.add_argument('--theme',type=Path,required=True)
parser.add_argument('--source',type=Path,default=Path(__file__).resolve().parents[1]/'catalogue/products.json')
parser.add_argument('--check',action='store_true')
args=parser.parse_args()
THEME=args.theme.resolve()
SOURCE=json.loads(args.source.read_text())
DIFFS=[]
PRODUCTS = copy.deepcopy(SOURCE['products'])
BY_KEY = {p['key']: p for p in PRODUCTS}
assert len(BY_KEY) == len(PRODUCTS), 'Product keys must be unique'
assert all(re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', p['key']) for p in PRODUCTS), 'Use stable lowercase product keys'
for p in PRODUCTS:
    assert all(p.get('title', {}).get(lang) and p.get('description', {}).get(lang) for lang in ('en', 'fr')), p['key']
    assert p.get('category') and p.get('role') and isinstance(p.get('variants'), list) and p['variants'], p['key']
MAPPING = {}
BUILD_VERSION = SOURCE['version']

def put(path, content):
    p=THEME/path
    existing=p.read_text() if p.exists() else None
    if existing==content:return
    DIFFS.append(path)
    if args.check:return
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content,encoding='utf-8')

def jdump(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))

def translated(key):
    return "{{ '" + key + "' | t }}"

def copy_prefix(p):
    return 'suiji_products.' + p['key'].replace('-', '_') + '.'

def route(p):
    return '/collections/' + p['category'] + '?view=suiji-p-' + p['key']

def localized_route(path):
    return "{{ routes.root_url | append: '" + path + "' | replace: '//', '/' }}"

def localized_string(p, field, default=''):
    return p.get(field) or {'en': default, 'fr': default}

def connection_copy(p):
    if p['core_lock_included'] is True:
        return {
            'en': 'Core-Lock is included. SUIJI ornaments fit bases equipped with the SUIJI multi-use clasp. Check the parts supplied for this composition.',
            'fr': 'Core-Lock est inclus. Les ornements SUIJI s’adaptent aux bases équipées du fermoir multi-usage SUIJI. Vérifiez les pièces fournies pour cette composition.'
        }
    if p['core_lock_compatibility'] == 'adapter_required':
        return {
            'en': 'Core-Lock is not included in this piece. An additional attachment is needed for an interchangeable composition; check the complete set of parts.',
            'fr': 'Cette pièce ne comprend pas Core-Lock. Une attache supplémentaire est nécessaire pour une composition interchangeable ; vérifiez toutes les pièces.'
        }
    if p['role'] == 'charm' and p['core_lock_compatibility'] == 'direct':
        return {
            'en': 'An ornament is the decorative element. Choose a separate base equipped with the SUIJI multi-use clasp to wear it.',
            'fr': 'L’ornement est l’élément décoratif. Choisissez séparément une base équipée du fermoir multi-usage SUIJI pour le porter.'
        }
    if p['core_lock_compatibility'] == 'not_applicable':
        return {
            'en': 'This piece is used in its own listed arrangement. It does not include the SUIJI multi-use clasp.',
            'fr': 'Cette pièce se porte selon la composition indiquée. Elle ne comprend pas le fermoir multi-usage SUIJI.'
        }
    return {
        'en': 'A design preview. Ask us to confirm the exact piece and its required parts before choosing an interchangeable composition.',
        'fr': 'Un aperçu de création. Faites confirmer la pièce exacte et les éléments nécessaires avant de choisir une composition interchangeable.'
    }

ROLE = {
    'ring_base': ('Ring base', 'Support de bague'),
    'earring_base': ('Earring base', 'Support de boucle'),
    'pendant_base': ('Pendant base', 'Support de pendentif'),
    'necklace_base': ('Necklace base', 'Support de collier'),
    'bracelet_base': ('Bracelet base', 'Support de bracelet'),
    'charm': ('Ornament', 'Ornement'),
    'connector': ('Connector', 'Connecteur'),
    'ear_back': ('Ear back', 'Fermoir d’oreille'),
    'assembled_jewelry': ('Jewelry', 'Bijou'),
    'set': ('Set', 'Ensemble')
}
CATEGORIES = {
    'all': ('Shop all', 'Tous les bijoux'),
    'rings': ('Rings', 'Bagues'),
    'earrings': ('Earrings', 'Boucles d’oreilles'),
    'necklaces': ('Necklaces', 'Colliers'),
    'bracelets': ('Bracelets & bangles', 'Bracelets'),
    'charms': ('Charms', 'Ornements'),
    'extras': ('Accessories', 'Accessoires'),
    'sets': ('Sets', 'Ensembles'),
    'bases': ('Jewelry bases', 'Supports de bijoux')
}
COMMON = {
    'en': {
        'home': 'Home', 'breadcrumb': 'Breadcrumb', 'included': 'Included with this piece', 'material': 'Material',
        'metal': 'TC4 titanium metalwork', 'connection': 'How it comes together',
        'options': 'Your choices', 'choose': 'Choose your combination',
        'loading': 'The selection controls are loading. You can already read the details below.',
        'retry': 'Try loading the options again', 'contact': 'Ask about this piece',
        'browse': 'Explore all jewelry', 'illustrative': 'Illustrative product visual',
        'demo': 'Shopping demonstration. Prices and images are illustrative; no real order or payment is created.',
        'pair': 'Sold as a pair', 'ring_guide': 'Ring size guide and international conversions',
        'care': 'Care and storage', 'system': 'How Core-Lock works',
        'shared': 'The two ornaments are shared between arrangements; they do not multiply when you change wearing position.',
        'related': 'Complete the look', 'journal': 'A guide for this choice',
        'category_intro': 'Explore the pieces, their included parts and the ways they can fit your own compositions.',
        'catalogue_loading': 'Filters and selection controls are loading. The pieces and their details remain available.',
        'no_js': 'You can browse the pieces and read their details here. Enable JavaScript to try the demonstration bag.',
        'counts': 'pieces', 'more': 'View piece', 'stone': 'Moissanite',
    },
    'fr': {
        'home': 'Accueil', 'breadcrumb': 'Fil d’Ariane', 'included': 'Les pièces incluses', 'material': 'Matière',
        'metal': 'Parties métalliques en titane TC4', 'connection': 'Comment les pièces se composent',
        'options': 'Vos choix', 'choose': 'Choisissez votre composition',
        'loading': 'Les options se chargent. Les informations sur la pièce sont déjà disponibles ci-dessous.',
        'retry': 'Réessayer de charger les options', 'contact': 'Une question sur cette pièce',
        'browse': 'Découvrir tous les bijoux', 'illustrative': 'Visuel produit illustratif',
        'demo': 'Parcours de démonstration. Prix et images illustratifs ; aucune commande réelle ni aucun paiement.',
        'pair': 'Vendu par paire', 'ring_guide': 'Guide des tailles de bague et conversions internationales',
        'care': 'Entretien et rangement', 'system': 'Comprendre Core-Lock',
        'shared': 'Les deux ornements se partagent entre les compositions ; ils ne se multiplient pas quand vous changez de position.',
        'related': 'Complétez votre composition', 'journal': 'Un guide pour vous aider à choisir',
        'category_intro': 'Découvrez les pièces, leur contenu et les façons de les intégrer à vos propres compositions.',
        'catalogue_loading': 'Les filtres et options se chargent. Les pièces et leurs informations restent accessibles.',
        'no_js': 'Les pièces et leurs informations restent accessibles. Activez JavaScript pour essayer le panier de démonstration.',
        'counts': 'pièces', 'more': 'Voir la pièce', 'stone': 'Moissanite',
    }
}

def guide(p):
    if p['role'] == 'set':
        return '/blogs/journal?view=suiji-j05', ('One base, two ornaments', 'Une base, deux ornements')
    if p['role'] == 'charm' or p['core_lock_included'] is True or p['core_lock_compatibility'] == 'adapter_required':
        return '/blogs/journal?view=suiji-j04', ('Check your base and ornament', 'Vérifier la base et l’ornement')
    if p['category'] == 'earrings':
        return '/blogs/journal?view=suiji-j11', ('Choosing a hoop', 'Choisir une créole')
    return '/pages/care-guide', ('Care for your pieces', 'Entretenir vos pièces')

for p in PRODUCTS:
    p['product_path'] = route(p)
    p['detail_file'] = 'suiji-item-' + p['key'] + '.json'
    p['has_ring_size'] = any(o['key'] == 'ring_size' for o in p['options'])
    p['connection_copy'] = connection_copy(p)
    if not p.get('help_link'):
        path, labels = guide(p)
        p['help_link'] = {'path': path, 'label': {'en': labels[0], 'fr': labels[1]}}
    put('assets/' + p['detail_file'], jdump(p) + '\n')
    MAPPING[p['key']] = {
        'category': p['category'], 'old_path': '/collections/' + p['category'] + '?view=suiji-product&product=' + p['key'],
        'new_path': p['product_path'], 'backend_identity': 'Reuse existing Product/Variant mapping; no new product or visibility change.',
        'variants': len(p['variants']), 'role': p['role'], 'included': p['core_lock_included'],
        'compatibility': p['core_lock_compatibility'], 'bom_count': p.get('bom_count')
    }
    template = {'sections': {'main': {'type': 'suiji-commerce-product', 'settings': {'product_key': p['key']}}}, 'order': ['main']}
    put('templates/collection.suiji-p-' + p['key'] + '.json', json.dumps(template, ensure_ascii=False, indent=2) + '\n')

INDEX_FIELDS = ['key','code','title','category','role','core_lock_included','core_lock_compatibility','metal','alloy','stone','sale_unit','demo_price_cents','description','recommendations','product_path','detail_file','has_ring_size']
index_rows = []
for p in PRODUCTS:
    item = {k: p[k] for k in INDEX_FIELDS if k in p}
    item['image'] = {k:p['image'][k] for k in ['thumb','width','height']}
    if p.get('stone_palette'):
        item['stone_palette'] = [{'name': x['name'], 'type': x['type'], 'colour': x['colour']} for x in p['stone_palette']]
    index_rows.append(item)
put('assets/suiji-commerce-index.json', jdump({'schema':'suiji-public-index/2','version':BUILD_VERSION,'currency':'EUR','demo_only':True,'products':index_rows}) + '\n')

locale_original = {}
for lang, filename in [('en','en.default.json'),('fr','fr.json')]:
    path = THEME / 'locales' / filename
    raw = path.read_text()
    match = re.match(r'\A(/\*.*?\*/\s*)', raw, re.S)
    header = match[1] if match else ''
    data = json.loads(raw[len(header):])
    locale_original[lang] = copy.deepcopy(data)
    data['suiji_storefront'] = COMMON[lang]
    data['suiji_storefront']['categories'] = {k:v[0 if lang=='en' else 1] for k,v in CATEGORIES.items()}
    data['suiji_storefront']['roles'] = {k:v[0 if lang=='en' else 1] for k,v in ROLE.items()}
    data['suiji_products'] = {}
    for p in PRODUCTS:
        pre = p['key'].replace('-', '_')
        data['suiji_products'][pre] = {
            'title': p['title'][lang], 'description': p['description'][lang],
            'notes': p['notes'][lang], 'connection': p['connection_copy'][lang],
            'included_html': '<ul>' + ''.join('<li>'+html.escape(b[lang])+'</li>' for b in p['bom']) + '</ul>',
            'options_html': '<ul>' + ''.join('<li><strong>'+html.escape(o['name'][lang])+':</strong> '+', '.join(html.escape(v['label'][lang]) for v in o['values'])+'</li>' for o in p['options']) + '</ul>',
            'guide_label': p['help_link']['label'][lang]
        }
    for p in PRODUCTS:
        if not p.get('metal'):
            data['suiji_products'][p['key'].replace('-', '_')]['material'] = p.get('other_material', {}).get(lang, '')
    put('locales/' + filename, header + json.dumps(data, ensure_ascii=False, indent=2) + '\n')

metadata = ["{% doc %}\nPublic demo product metadata from the frozen catalogue; no price/stock/Offer claims.\n@param {string} product_key - Approved catalogue key.\n@param {string} field - title, description, category or path.\n{% enddoc %}", "{%- case product_key -%}"]
cards = ["{% doc %}\nOne server-rendered product card with an ordinary link.\n@param {string} product_key - Approved catalogue key.\n{% enddoc %}", "{%- case product_key -%}"]
static = ["{% doc %}\nServer-rendered details remain readable before or without the interactive demo.\n@param {string} product_key - Approved catalogue key.\n{% enddoc %}", "{%- case product_key -%}"]
for p in PRODUCTS:
    pre = copy_prefix(p)
    metadata += ["{%- when '" + p['key'] + "' -%}", "{%- case field -%}",
                 "{%- when 'title' -%}" + translated(pre+'title'),
                 "{%- when 'description' -%}" + translated(pre+'description'),
                 "{%- when 'category' -%}" + p['category'],
                 "{%- when 'path' -%}" + p['product_path'], "{%- endcase -%}"]
    image = p['image']
    card = '<article class="sc-card"><div class="sc-card-image"><a href="'+localized_route(route(p))+'"><img src="'+html.escape(image['thumb'],quote=True)+'" width="'+str(image['width'])+'" height="'+str(image['height'])+'" loading="lazy" decoding="async" alt="'+translated(pre+'title')+'"></a></div><h3><a href="'+localized_route(route(p))+'">'+translated(pre+'title')+'</a></h3><p>'+translated('suiji_storefront.roles.'+p['role'])+'</p><p class="sc-card-preview-label">'+translated('suiji_storefront.more')+'</p></article>'
    cards += ["{%- when '" + p['key'] + "' -%}", card]
    rel = ''.join("{% render 'suiji-product-card-static', product_key: '"+key+"' %}" for key in p['recommendations'][:2] if key in BY_KEY)
    materials = translated('suiji_storefront.metal') if p.get('metal') else translated(pre+'material')
    unit = '<p>'+translated('suiji_storefront.pair')+'</p>' if p['sale_unit']=='pair' else ''
    shared = '<p class="sc-shared-note">'+translated('suiji_storefront.shared')+'</p>' if p['key'].startswith(('set04','set05','set06')) else ''
    ringguide = '<a href="'+localized_route('/pages/bases#size-guide')+'">'+translated('suiji_storefront.ring_guide')+' →</a>' if p['has_ring_size'] or p['key'] in ['set03-ring-set','set05-stud-earring-ring-set','set06-hoop-earring-necklace-ring-set'] else ''
    body = '<div class="sc-ssr-product" data-server-content><div class="sc-product-grid sc-pdp-layout"><header class="sc-pdp-heading"><nav class="sc-breadcrumb" aria-label="{{ \'suiji_storefront.breadcrumb\' | t | escape }}"><a href="{{ routes.root_url }}">'+translated('suiji_storefront.home')+'</a><span aria-hidden="true">·</span><a href="'+localized_route('/collections/'+p['category'])+'">'+translated('suiji_storefront.categories.'+p['category'])+'</a></nav><h1>'+translated(pre+'title')+'</h1><p>'+translated(pre+'description')+'</p></header><section class="sc-gallery sc-pdp-gallery"><img class="sc-static-main-image" src="'+html.escape(image['src'],quote=True)+'" width="'+str(image['width'])+'" height="'+str(image['height'])+'" loading="eager" fetchpriority="high" decoding="async" alt="'+translated(pre+'title')+'"><p class="sc-caption">'+translated('suiji_storefront.illustrative')+'</p></section><section class="sc-product-info sc-pdp-purchase"><p class="sc-demo-notice">'+translated('suiji_storefront.demo')+'</p>'+unit+'<div class="sc-material"><span>'+translated('suiji_storefront.material')+'</span><strong>'+materials+'</strong></div><h2>'+translated('suiji_storefront.included')+'</h2>'+translated(pre+'included_html')+shared+'<h2>'+translated('suiji_storefront.connection')+'</h2><p>'+translated(pre+'connection')+'</p><p><a href="'+localized_route('/pages/the-mechanism')+'">'+translated('suiji_storefront.system')+' →</a></p><h2>'+translated('suiji_storefront.options')+'</h2>'+translated(pre+'options_html')+'<p class="sc-loading" role="status">'+translated('suiji_storefront.loading')+'</p><p><a href="'+localized_route('/pages/contact')+'">'+translated('suiji_storefront.contact')+'</a></p>'+ringguide+'</section><section class="sc-pdp-story"><h2>'+translated('suiji_storefront.journal')+'</h2><p><a href="'+localized_route(p['help_link']['path'])+'">'+translated(pre+'guide_label')+' →</a></p><p><a href="'+localized_route('/pages/care-guide')+'">'+translated('suiji_storefront.care')+' →</a></p><p>'+translated(pre+'notes')+'</p></section></div><section class="sc-recommendations"><h2>'+translated('suiji_storefront.related')+'</h2><div class="sc-recommendation-rail">'+rel+'</div></section></div>'
    static += ["{%- when '" + p['key'] + "' -%}", body]
metadata += ["{%- endcase -%}"]
cards += ["{%- endcase -%}"]
static += ["{%- endcase -%}"]
put('snippets/suiji-product-metadata.liquid', '\n'.join(metadata)+'\n')
put('snippets/suiji-product-card-static.liquid', '\n'.join(cards)+'\n')
put('snippets/suiji-product-static.liquid', '\n'.join(static)+'\n')

catalog = ["{% doc %}\nServer-rendered collection details and links; JavaScript adds filters and pagination.\n@param {string} category - Existing wearing category or all.\n{% enddoc %}", '<div data-server-content class="sc-ssr-catalogue">', '''{% assign catalogue_title_category = category | default: 'all' %}{% if category == 'search' %}{% assign catalogue_title_category = 'all' %}{% endif %}
{% assign catalogue_title_key = 'suiji_storefront.categories.' | append: catalogue_title_category %}
<header class="sc-list-head"><p>SUIJI</p><h1>{{ catalogue_title_key | t }}</h1><p>'''+translated('suiji_storefront.category_intro')+'</p></header>', '<nav class="sc-category-nav" aria-label="{{ \'suiji_commerce.contact\' | t | escape }}">']
for cat in CATEGORIES:
    if cat in ['bases']: continue
    catalog.append('<a href="'+localized_route('/collections/'+cat)+'">'+translated('suiji_storefront.categories.'+cat)+'</a>')
catalog += ['</nav>', '<p class="sc-loading" role="status">'+translated('suiji_storefront.catalogue_loading')+'</p>', '<div class="sc-catalogue-grid">']
for p in PRODUCTS:
    catalog += ["{% if category == 'all' or category == 'search' or category == '"+p['category']+"' or category == 'bases' and '"+p['role']+"' contains '_base' %}", "{% render 'suiji-product-card-static', product_key: '"+p['key']+"' %}", "{% endif %}"]
catalog += ['</div><p class="sc-caption">'+translated('suiji_storefront.demo')+'</p></div>']
put('snippets/suiji-catalogue-static.liquid', '\n'.join(catalog)+'\n')


print(json.dumps({'mode':'check' if args.check else 'write','products':len(PRODUCTS),'different_files':DIFFS}))
if args.check and DIFFS:sys.exit(1)
