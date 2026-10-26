# Map library notices and dependency inventory

Research snapshot: 2026-10-26. No package was installed. Versions are pinned; full texts are in `licenses/`.

Markmap inventory is a conservative production closure from its published git commit lockfile plus bundled helpers; it includes optional and Node-only packages not executed by this demo. Mermaid inventory is the exact package/version set named by its full browser bundle sourcemap; subcomponents bundled inside those packages retain their own notices in the copied licence files. jsMind has no production dependencies.

MIT / ISC: retain copyright, permission and disclaimer. BSD-2-Clause / BSD-3-Clause: retain copyright, conditions and disclaimer in distribution materials; BSD-3-Clause also forbids implied endorsement.

Python-2.0 (argparse): retain the complete licence and copyright; describe changes to that component if made. WTFPL / Unlicense have no attribution requirement; retaining their texts records provenance.

Apache-2.0: include licence, preserve required copyright/NOTICE material and mark modified files. DOMPurify offers MPL-2.0 OR Apache-2.0; choose Apache-2.0.

EPL-2.0 (ELK): keep licence/notices and make the EPL-covered library source, including modifications, available with a source-access notice. Its commercial-distributor terms also apply. This is more than a notice-only requirement; it does not automatically require publishing separate application code. See https://www.eclipse.org/legal/epl-2.0/ and https://www.eclipse.org/legal/eplfaq.php .

Demos do not load KaTeX fonts, syntax-highlighting assets, external CSS or remote plugins. Enabling such assets later needs an asset-level licence review; this inventory is not approval of future plugins.

## markmap

Exact published-commit lockfile production closure plus known bundled helpers; conservative superset includes unused math/highlighting and Node-only modules.

| Package | Licence | Notice text |
|---|---|---|
| [@babel/runtime@7.26.0](https://registry.npmjs.org/@babel/runtime/7.26.0) | MIT | [LICENSE](licenses/@babel__runtime@7.26.0/LICENSE) |
| [@gera2ld/jsx-dom@2.2.2](https://registry.npmjs.org/@gera2ld/jsx-dom/2.2.2) | ISC | [LICENSE](licenses/@gera2ld__jsx-dom@2.2.2/LICENSE) |
| [@vscode/markdown-it-katex@1.1.1](https://registry.npmjs.org/@vscode/markdown-it-katex/1.1.1) | MIT | [LICENSE](licenses/@vscode__markdown-it-katex@1.1.1/LICENSE) |
| [argparse@2.0.1](https://registry.npmjs.org/argparse/2.0.1) | Python-2.0 | [LICENSE](licenses/argparse@2.0.1/LICENSE) |
| [boolbase@1.0.0](https://registry.npmjs.org/boolbase/1.0.0) | ISC | [boolbase@1.0.0-LICENSE.txt](licenses/boolbase@1.0.0-LICENSE.txt) |
| [cheerio@1.0.0](https://registry.npmjs.org/cheerio/1.0.0) | MIT | [LICENSE](licenses/cheerio@1.0.0/LICENSE) |
| [cheerio-select@2.1.0](https://registry.npmjs.org/cheerio-select/2.1.0) | BSD-2-Clause | [LICENSE](licenses/cheerio-select@2.1.0/LICENSE) |
| [commander@7.2.0](https://registry.npmjs.org/commander/7.2.0) | MIT | [LICENSE](licenses/commander@7.2.0/LICENSE) |
| [commander@8.3.0](https://registry.npmjs.org/commander/8.3.0) | MIT | [LICENSE](licenses/commander@8.3.0/LICENSE) |
| [css-select@5.1.0](https://registry.npmjs.org/css-select/5.1.0) | BSD-2-Clause | [LICENSE](licenses/css-select@5.1.0/LICENSE) |
| [css-what@6.1.0](https://registry.npmjs.org/css-what/6.1.0) | BSD-2-Clause | [LICENSE](licenses/css-what@6.1.0/LICENSE) |
| [d3@7.9.0](https://registry.npmjs.org/d3/7.9.0) | ISC | [LICENSE](licenses/d3@7.9.0/LICENSE) |
| [d3-array@3.2.4](https://registry.npmjs.org/d3-array/3.2.4) | ISC | [LICENSE](licenses/d3-array@3.2.4/LICENSE) |
| [d3-axis@3.0.0](https://registry.npmjs.org/d3-axis/3.0.0) | ISC | [LICENSE](licenses/d3-axis@3.0.0/LICENSE) |
| [d3-brush@3.0.0](https://registry.npmjs.org/d3-brush/3.0.0) | ISC | [LICENSE](licenses/d3-brush@3.0.0/LICENSE) |
| [d3-chord@3.0.1](https://registry.npmjs.org/d3-chord/3.0.1) | ISC | [LICENSE](licenses/d3-chord@3.0.1/LICENSE) |
| [d3-color@3.1.0](https://registry.npmjs.org/d3-color/3.1.0) | ISC | [LICENSE](licenses/d3-color@3.1.0/LICENSE) |
| [d3-contour@4.0.2](https://registry.npmjs.org/d3-contour/4.0.2) | ISC | [LICENSE](licenses/d3-contour@4.0.2/LICENSE) |
| [d3-delaunay@6.0.4](https://registry.npmjs.org/d3-delaunay/6.0.4) | ISC | [LICENSE](licenses/d3-delaunay@6.0.4/LICENSE) |
| [d3-dispatch@3.0.1](https://registry.npmjs.org/d3-dispatch/3.0.1) | ISC | [LICENSE](licenses/d3-dispatch@3.0.1/LICENSE) |
| [d3-drag@3.0.0](https://registry.npmjs.org/d3-drag/3.0.0) | ISC | [LICENSE](licenses/d3-drag@3.0.0/LICENSE) |
| [d3-dsv@3.0.1](https://registry.npmjs.org/d3-dsv/3.0.1) | ISC | [LICENSE](licenses/d3-dsv@3.0.1/LICENSE) |
| [d3-ease@3.0.1](https://registry.npmjs.org/d3-ease/3.0.1) | BSD-3-Clause | [LICENSE](licenses/d3-ease@3.0.1/LICENSE) |
| [d3-fetch@3.0.1](https://registry.npmjs.org/d3-fetch/3.0.1) | ISC | [LICENSE](licenses/d3-fetch@3.0.1/LICENSE) |
| [d3-flextree@2.1.2](https://registry.npmjs.org/d3-flextree/2.1.2) | WTFPL | [LICENSE](licenses/d3-flextree@2.1.2/LICENSE) |
| [d3-force@3.0.0](https://registry.npmjs.org/d3-force/3.0.0) | ISC | [LICENSE](licenses/d3-force@3.0.0/LICENSE) |
| [d3-format@3.1.0](https://registry.npmjs.org/d3-format/3.1.0) | ISC | [LICENSE](licenses/d3-format@3.1.0/LICENSE) |
| [d3-geo@3.1.0](https://registry.npmjs.org/d3-geo/3.1.0) | ISC | [LICENSE](licenses/d3-geo@3.1.0/LICENSE) |
| [d3-hierarchy@1.1.9](https://registry.npmjs.org/d3-hierarchy/1.1.9) | BSD-3-Clause | [LICENSE](licenses/d3-hierarchy@1.1.9/LICENSE) |
| [d3-hierarchy@3.1.2](https://registry.npmjs.org/d3-hierarchy/3.1.2) | ISC | [LICENSE](licenses/d3-hierarchy@3.1.2/LICENSE) |
| [d3-interpolate@3.0.1](https://registry.npmjs.org/d3-interpolate/3.0.1) | ISC | [LICENSE](licenses/d3-interpolate@3.0.1/LICENSE) |
| [d3-path@3.1.0](https://registry.npmjs.org/d3-path/3.1.0) | ISC | [LICENSE](licenses/d3-path@3.1.0/LICENSE) |
| [d3-polygon@3.0.1](https://registry.npmjs.org/d3-polygon/3.0.1) | ISC | [LICENSE](licenses/d3-polygon@3.0.1/LICENSE) |
| [d3-quadtree@3.0.1](https://registry.npmjs.org/d3-quadtree/3.0.1) | ISC | [LICENSE](licenses/d3-quadtree@3.0.1/LICENSE) |
| [d3-random@3.0.1](https://registry.npmjs.org/d3-random/3.0.1) | ISC | [LICENSE](licenses/d3-random@3.0.1/LICENSE) |
| [d3-scale@4.0.2](https://registry.npmjs.org/d3-scale/4.0.2) | ISC | [LICENSE](licenses/d3-scale@4.0.2/LICENSE) |
| [d3-scale-chromatic@3.0.0](https://registry.npmjs.org/d3-scale-chromatic/3.0.0) | ISC | [LICENSE](licenses/d3-scale-chromatic@3.0.0/LICENSE) |
| [d3-selection@3.0.0](https://registry.npmjs.org/d3-selection/3.0.0) | ISC | [LICENSE](licenses/d3-selection@3.0.0/LICENSE) |
| [d3-shape@3.2.0](https://registry.npmjs.org/d3-shape/3.2.0) | ISC | [LICENSE](licenses/d3-shape@3.2.0/LICENSE) |
| [d3-time@3.1.0](https://registry.npmjs.org/d3-time/3.1.0) | ISC | [LICENSE](licenses/d3-time@3.1.0/LICENSE) |
| [d3-time-format@4.1.0](https://registry.npmjs.org/d3-time-format/4.1.0) | ISC | [LICENSE](licenses/d3-time-format@4.1.0/LICENSE) |
| [d3-timer@3.0.1](https://registry.npmjs.org/d3-timer/3.0.1) | ISC | [LICENSE](licenses/d3-timer@3.0.1/LICENSE) |
| [d3-transition@3.0.1](https://registry.npmjs.org/d3-transition/3.0.1) | ISC | [LICENSE](licenses/d3-transition@3.0.1/LICENSE) |
| [d3-zoom@3.0.0](https://registry.npmjs.org/d3-zoom/3.0.0) | ISC | [LICENSE](licenses/d3-zoom@3.0.0/LICENSE) |
| [delaunator@5.0.0](https://registry.npmjs.org/delaunator/5.0.0) | ISC | [LICENSE](licenses/delaunator@5.0.0/LICENSE) |
| [dom-serializer@2.0.0](https://registry.npmjs.org/dom-serializer/2.0.0) | MIT | [LICENSE](licenses/dom-serializer@2.0.0/LICENSE) |
| [domelementtype@2.3.0](https://registry.npmjs.org/domelementtype/2.3.0) | BSD-2-Clause | [LICENSE](licenses/domelementtype@2.3.0/LICENSE) |
| [domhandler@5.0.3](https://registry.npmjs.org/domhandler/5.0.3) | BSD-2-Clause | [LICENSE](licenses/domhandler@5.0.3/LICENSE) |
| [domutils@3.1.0](https://registry.npmjs.org/domutils/3.1.0) | BSD-2-Clause | [LICENSE](licenses/domutils@3.1.0/LICENSE) |
| [encoding-sniffer@0.2.0](https://registry.npmjs.org/encoding-sniffer/0.2.0) | MIT | [LICENSE](licenses/encoding-sniffer@0.2.0/LICENSE) |
| [entities@4.5.0](https://registry.npmjs.org/entities/4.5.0) | BSD-2-Clause | [LICENSE](licenses/entities@4.5.0/LICENSE) |
| [highlight.js@11.11.1](https://registry.npmjs.org/highlight.js/11.11.1) | BSD-3-Clause | [LICENSE](licenses/highlight.js@11.11.1/LICENSE) |
| [htmlparser2@9.1.0](https://registry.npmjs.org/htmlparser2/9.1.0) | MIT | [LICENSE](licenses/htmlparser2@9.1.0/LICENSE) |
| [iconv-lite@0.6.3](https://registry.npmjs.org/iconv-lite/0.6.3) | MIT | [LICENSE](licenses/iconv-lite@0.6.3/LICENSE) |
| [internmap@2.0.3](https://registry.npmjs.org/internmap/2.0.3) | ISC | [LICENSE](licenses/internmap@2.0.3/LICENSE) |
| [katex@0.16.18](https://registry.npmjs.org/katex/0.16.18) | MIT | [LICENSE](licenses/katex@0.16.18/LICENSE) |
| [linkify-it@5.0.0](https://registry.npmjs.org/linkify-it/5.0.0) | MIT | [LICENSE](licenses/linkify-it@5.0.0/LICENSE) |
| [markdown-it@14.1.0](https://registry.npmjs.org/markdown-it/14.1.0) | MIT | [LICENSE](licenses/markdown-it@14.1.0/LICENSE) |
| [markdown-it-ins@4.0.0](https://registry.npmjs.org/markdown-it-ins/4.0.0) | MIT | [LICENSE](licenses/markdown-it-ins@4.0.0/LICENSE) |
| [markdown-it-mark@4.0.0](https://registry.npmjs.org/markdown-it-mark/4.0.0) | MIT | [LICENSE](licenses/markdown-it-mark@4.0.0/LICENSE) |
| [markdown-it-sub@2.0.0](https://registry.npmjs.org/markdown-it-sub/2.0.0) | MIT | [LICENSE](licenses/markdown-it-sub@2.0.0/LICENSE) |
| [markdown-it-sup@2.0.0](https://registry.npmjs.org/markdown-it-sup/2.0.0) | MIT | [LICENSE](licenses/markdown-it-sup@2.0.0/LICENSE) |
| [markmap-common@0.18.9](https://registry.npmjs.org/markmap-common/0.18.9) | MIT | [LICENSE](licenses/markmap-common@0.18.9/LICENSE) |
| [markmap-html-parser@0.18.11](https://registry.npmjs.org/markmap-html-parser/0.18.11) | MIT | [LICENSE](licenses/markmap-html-parser@0.18.11/LICENSE) |
| [markmap-lib@0.18.12](https://registry.npmjs.org/markmap-lib/0.18.12) | MIT | [LICENSE](licenses/markmap-lib@0.18.12/LICENSE) |
| [markmap-view@0.18.12](https://registry.npmjs.org/markmap-view/0.18.12) | MIT | [LICENSE](licenses/markmap-view@0.18.12/LICENSE) |
| [mdurl@2.0.0](https://registry.npmjs.org/mdurl/2.0.0) | MIT | [LICENSE](licenses/mdurl@2.0.0/LICENSE) |
| [npm2url@0.2.4](https://registry.npmjs.org/npm2url/0.2.4) | MIT | [LICENSE](licenses/npm2url@0.2.4/LICENSE) |
| [nth-check@2.1.1](https://registry.npmjs.org/nth-check/2.1.1) | BSD-2-Clause | [LICENSE](licenses/nth-check@2.1.1/LICENSE) |
| [parse5@7.1.2](https://registry.npmjs.org/parse5/7.1.2) | MIT | [LICENSE](licenses/parse5@7.1.2/LICENSE) |
| [parse5-htmlparser2-tree-adapter@7.0.0](https://registry.npmjs.org/parse5-htmlparser2-tree-adapter/7.0.0) | MIT | [LICENSE](licenses/parse5-htmlparser2-tree-adapter@7.0.0/LICENSE) |
| [parse5-parser-stream@7.1.2](https://registry.npmjs.org/parse5-parser-stream/7.1.2) | MIT | [LICENSE](licenses/parse5-parser-stream@7.1.2/LICENSE) |
| [prismjs@1.29.0](https://registry.npmjs.org/prismjs/1.29.0) | MIT | [LICENSE](licenses/prismjs@1.29.0/LICENSE) |
| [punycode.js@2.3.1](https://registry.npmjs.org/punycode.js/2.3.1) | MIT | [LICENSE-MIT.txt](licenses/punycode.js@2.3.1/LICENSE-MIT.txt) |
| [regenerator-runtime@0.14.1](https://registry.npmjs.org/regenerator-runtime/0.14.1) | MIT | [LICENSE](licenses/regenerator-runtime@0.14.1/LICENSE) |
| [robust-predicates@3.0.2](https://registry.npmjs.org/robust-predicates/3.0.2) | Unlicense | [LICENSE](licenses/robust-predicates@3.0.2/LICENSE) |
| [rw@1.3.3](https://registry.npmjs.org/rw/1.3.3) | BSD-3-Clause | [LICENSE](licenses/rw@1.3.3/LICENSE) |
| [safer-buffer@2.1.2](https://registry.npmjs.org/safer-buffer/2.1.2) | MIT | [LICENSE](licenses/safer-buffer@2.1.2/LICENSE) |
| [uc.micro@2.1.0](https://registry.npmjs.org/uc.micro/2.1.0) | MIT | [LICENSE.txt](licenses/uc.micro@2.1.0/LICENSE.txt) |
| [undici@6.19.8](https://registry.npmjs.org/undici/6.19.8) | MIT | [LICENSE](licenses/undici@6.19.8/LICENSE), [LICENSE](licenses/undici@6.19.8/lib/web/fetch/LICENSE) |
| [whatwg-encoding@3.1.1](https://registry.npmjs.org/whatwg-encoding/3.1.1) | MIT | [LICENSE.txt](licenses/whatwg-encoding@3.1.1/LICENSE.txt) |
| [whatwg-mimetype@4.0.0](https://registry.npmjs.org/whatwg-mimetype/4.0.0) | MIT | [LICENSE.txt](licenses/whatwg-mimetype@4.0.0/LICENSE.txt) |
| [yaml@2.6.1](https://registry.npmjs.org/yaml/2.6.1) | ISC | [LICENSE](licenses/yaml@2.6.1/LICENSE) |

## jsmind

Published runtime dependencies.

| Package | Licence | Notice text |
|---|---|---|
| [jsmind@0.9.1](https://registry.npmjs.org/jsmind/0.9.1) | BSD-3-Clause | [LICENSE](licenses/jsmind@0.9.1/LICENSE) |

## mermaid

Exact modules in published full-browser sourcemap.

| Package | Licence | Notice text |
|---|---|---|
| [@braintree/sanitize-url@7.1.2](https://registry.npmjs.org/@braintree/sanitize-url/7.1.2) | MIT | [LICENSE](licenses/@braintree__sanitize-url@7.1.2/LICENSE) |
| [@chevrotain/cst-dts-gen@13.2.0](https://registry.npmjs.org/@chevrotain/cst-dts-gen/13.2.0) | Apache-2.0 | [LICENSE.txt](licenses/@chevrotain__cst-dts-gen@13.2.0/LICENSE.txt) |
| [@chevrotain/gast@13.2.0](https://registry.npmjs.org/@chevrotain/gast/13.2.0) | Apache-2.0 | [LICENSE.txt](licenses/@chevrotain__gast@13.2.0/LICENSE.txt) |
| [@chevrotain/regexp-to-ast@13.2.0](https://registry.npmjs.org/@chevrotain/regexp-to-ast/13.2.0) | Apache-2.0 | [LICENSE.txt](licenses/@chevrotain__regexp-to-ast@13.2.0/LICENSE.txt) |
| [@chevrotain/utils@13.2.0](https://registry.npmjs.org/@chevrotain/utils/13.2.0) | Apache-2.0 | [LICENSE.txt](licenses/@chevrotain__utils@13.2.0/LICENSE.txt) |
| [@iconify/utils@3.0.2](https://registry.npmjs.org/@iconify/utils/3.0.2) | MIT | [licenses.d.ts](licenses/@iconify__utils@3.0.2/lib/misc/licenses.d.ts), [licenses.js](licenses/@iconify__utils@3.0.2/lib/misc/licenses.js), [license.txt](licenses/@iconify__utils@3.0.2/license.txt) |
| [@upsetjs/venn.js@2.0.0](https://registry.npmjs.org/@upsetjs/venn.js/2.0.0) | MIT | [LICENSE](licenses/@upsetjs__venn.js@2.0.0/LICENSE) |
| [chevrotain@13.2.0](https://registry.npmjs.org/chevrotain/13.2.0) | Apache-2.0 | [LICENSE.txt](licenses/chevrotain@13.2.0/LICENSE.txt) |
| [cose-base@1.0.3](https://registry.npmjs.org/cose-base/1.0.3) | MIT | [LICENSE](licenses/cose-base@1.0.3/LICENSE) |
| [cose-base@2.2.0](https://registry.npmjs.org/cose-base/2.2.0) | MIT | [LICENSE](licenses/cose-base@2.2.0/LICENSE) |
| [cytoscape@3.34.0](https://registry.npmjs.org/cytoscape/3.34.0) | MIT | [LICENSE](licenses/cytoscape@3.34.0/LICENSE), [license-update.mjs](licenses/cytoscape@3.34.0/license-update.mjs) |
| [cytoscape-cose-bilkent@4.1.0](https://registry.npmjs.org/cytoscape-cose-bilkent/4.1.0) | MIT | [LICENSE](licenses/cytoscape-cose-bilkent@4.1.0/LICENSE) |
| [cytoscape-fcose@2.2.0](https://registry.npmjs.org/cytoscape-fcose/2.2.0) | MIT | [LICENSE](licenses/cytoscape-fcose@2.2.0/LICENSE) |
| [d3@7.9.0](https://registry.npmjs.org/d3/7.9.0) | ISC | [LICENSE](licenses/d3@7.9.0/LICENSE) |
| [d3-array@3.2.4](https://registry.npmjs.org/d3-array/3.2.4) | ISC | [LICENSE](licenses/d3-array@3.2.4/LICENSE) |
| [d3-array@2.12.1](https://registry.npmjs.org/d3-array/2.12.1) | BSD-3-Clause | [LICENSE](licenses/d3-array@2.12.1/LICENSE) |
| [d3-axis@3.0.0](https://registry.npmjs.org/d3-axis/3.0.0) | ISC | [LICENSE](licenses/d3-axis@3.0.0/LICENSE) |
| [d3-brush@3.0.0](https://registry.npmjs.org/d3-brush/3.0.0) | ISC | [LICENSE](licenses/d3-brush@3.0.0/LICENSE) |
| [d3-chord@3.0.1](https://registry.npmjs.org/d3-chord/3.0.1) | ISC | [LICENSE](licenses/d3-chord@3.0.1/LICENSE) |
| [d3-color@3.1.0](https://registry.npmjs.org/d3-color/3.1.0) | ISC | [LICENSE](licenses/d3-color@3.1.0/LICENSE) |
| [d3-contour@4.0.2](https://registry.npmjs.org/d3-contour/4.0.2) | ISC | [LICENSE](licenses/d3-contour@4.0.2/LICENSE) |
| [d3-delaunay@6.0.4](https://registry.npmjs.org/d3-delaunay/6.0.4) | ISC | [LICENSE](licenses/d3-delaunay@6.0.4/LICENSE) |
| [d3-dispatch@3.0.1](https://registry.npmjs.org/d3-dispatch/3.0.1) | ISC | [LICENSE](licenses/d3-dispatch@3.0.1/LICENSE) |
| [d3-drag@3.0.0](https://registry.npmjs.org/d3-drag/3.0.0) | ISC | [LICENSE](licenses/d3-drag@3.0.0/LICENSE) |
| [d3-dsv@3.0.1](https://registry.npmjs.org/d3-dsv/3.0.1) | ISC | [LICENSE](licenses/d3-dsv@3.0.1/LICENSE) |
| [d3-ease@3.0.1](https://registry.npmjs.org/d3-ease/3.0.1) | BSD-3-Clause | [LICENSE](licenses/d3-ease@3.0.1/LICENSE) |
| [d3-fetch@3.0.1](https://registry.npmjs.org/d3-fetch/3.0.1) | ISC | [LICENSE](licenses/d3-fetch@3.0.1/LICENSE) |
| [d3-force@3.0.0](https://registry.npmjs.org/d3-force/3.0.0) | ISC | [LICENSE](licenses/d3-force@3.0.0/LICENSE) |
| [d3-format@3.1.0](https://registry.npmjs.org/d3-format/3.1.0) | ISC | [LICENSE](licenses/d3-format@3.1.0/LICENSE) |
| [d3-geo@3.1.1](https://registry.npmjs.org/d3-geo/3.1.1) | ISC | [LICENSE](licenses/d3-geo@3.1.1/LICENSE) |
| [d3-hierarchy@3.1.2](https://registry.npmjs.org/d3-hierarchy/3.1.2) | ISC | [LICENSE](licenses/d3-hierarchy@3.1.2/LICENSE) |
| [d3-interpolate@3.0.1](https://registry.npmjs.org/d3-interpolate/3.0.1) | ISC | [LICENSE](licenses/d3-interpolate@3.0.1/LICENSE) |
| [d3-path@3.1.0](https://registry.npmjs.org/d3-path/3.1.0) | ISC | [LICENSE](licenses/d3-path@3.1.0/LICENSE) |
| [d3-path@1.0.9](https://registry.npmjs.org/d3-path/1.0.9) | BSD-3-Clause | [LICENSE](licenses/d3-path@1.0.9/LICENSE) |
| [d3-polygon@3.0.1](https://registry.npmjs.org/d3-polygon/3.0.1) | ISC | [LICENSE](licenses/d3-polygon@3.0.1/LICENSE) |
| [d3-quadtree@3.0.1](https://registry.npmjs.org/d3-quadtree/3.0.1) | ISC | [LICENSE](licenses/d3-quadtree@3.0.1/LICENSE) |
| [d3-random@3.0.1](https://registry.npmjs.org/d3-random/3.0.1) | ISC | [LICENSE](licenses/d3-random@3.0.1/LICENSE) |
| [d3-sankey@0.12.3](https://registry.npmjs.org/d3-sankey/0.12.3) | BSD-3-Clause | [LICENSE](licenses/d3-sankey@0.12.3/LICENSE) |
| [d3-scale@4.0.2](https://registry.npmjs.org/d3-scale/4.0.2) | ISC | [LICENSE](licenses/d3-scale@4.0.2/LICENSE) |
| [d3-scale-chromatic@3.1.0](https://registry.npmjs.org/d3-scale-chromatic/3.1.0) | ISC | [LICENSE](licenses/d3-scale-chromatic@3.1.0/LICENSE) |
| [d3-selection@3.0.0](https://registry.npmjs.org/d3-selection/3.0.0) | ISC | [LICENSE](licenses/d3-selection@3.0.0/LICENSE) |
| [d3-shape@3.2.0](https://registry.npmjs.org/d3-shape/3.2.0) | ISC | [LICENSE](licenses/d3-shape@3.2.0/LICENSE) |
| [d3-shape@1.3.7](https://registry.npmjs.org/d3-shape/1.3.7) | BSD-3-Clause | [LICENSE](licenses/d3-shape@1.3.7/LICENSE) |
| [d3-time@3.1.0](https://registry.npmjs.org/d3-time/3.1.0) | ISC | [LICENSE](licenses/d3-time@3.1.0/LICENSE) |
| [d3-time-format@4.1.0](https://registry.npmjs.org/d3-time-format/4.1.0) | ISC | [LICENSE](licenses/d3-time-format@4.1.0/LICENSE) |
| [d3-timer@3.0.1](https://registry.npmjs.org/d3-timer/3.0.1) | ISC | [LICENSE](licenses/d3-timer@3.0.1/LICENSE) |
| [d3-transition@3.0.1](https://registry.npmjs.org/d3-transition/3.0.1) | ISC | [LICENSE](licenses/d3-transition@3.0.1/LICENSE) |
| [d3-zoom@3.0.0](https://registry.npmjs.org/d3-zoom/3.0.0) | ISC | [LICENSE](licenses/d3-zoom@3.0.0/LICENSE) |
| [dagre-d3-es@7.0.14](https://registry.npmjs.org/dagre-d3-es/7.0.14) | MIT | [LICENSE.md](licenses/dagre-d3-es@7.0.14/LICENSE.md) |
| [dayjs@1.11.21](https://registry.npmjs.org/dayjs/1.11.21) | MIT | [LICENSE](licenses/dayjs@1.11.21/LICENSE) |
| [dompurify@3.4.12](https://registry.npmjs.org/dompurify/3.4.12) | (MPL-2.0 OR Apache-2.0) | [LICENSE](licenses/dompurify@3.4.12/LICENSE), [LICENSE-MPL](licenses/dompurify@3.4.12/LICENSE-MPL), [license_header](licenses/dompurify@3.4.12/src/license_header) |
| [elkjs@0.9.3](https://registry.npmjs.org/elkjs/0.9.3) | EPL-2.0 | [LICENSE.md](licenses/elkjs@0.9.3/LICENSE.md) |
| [es-toolkit@1.45.1](https://registry.npmjs.org/es-toolkit/1.45.1) | MIT | [LICENSE](licenses/es-toolkit@1.45.1/LICENSE) |
| [fastdom@1.0.12](https://registry.npmjs.org/fastdom/1.0.12) | MIT | [LICENSE-from-README.txt](licenses/fastdom@1.0.12/LICENSE-from-README.txt) |
| [internmap@2.0.3](https://registry.npmjs.org/internmap/2.0.3) | ISC | [LICENSE](licenses/internmap@2.0.3/LICENSE) |
| [js-yaml@4.3.0](https://registry.npmjs.org/js-yaml/4.3.0) | MIT | [LICENSE](licenses/js-yaml@4.3.0/LICENSE) |
| [katex@0.18.11](https://registry.npmjs.org/katex/0.18.11) | MIT | [LICENSE](licenses/katex@0.18.11/LICENSE) |
| [khroma@2.1.0](https://registry.npmjs.org/khroma/2.1.0) | MIT | [license](licenses/khroma@2.1.0/license) |
| [layout-base@1.0.2](https://registry.npmjs.org/layout-base/1.0.2) | MIT | [LICENSE](licenses/layout-base@1.0.2/LICENSE) |
| [layout-base@2.0.1](https://registry.npmjs.org/layout-base/2.0.1) | MIT | [LICENSE](licenses/layout-base@2.0.1/LICENSE) |
| [lodash-es@4.18.1](https://registry.npmjs.org/lodash-es/4.18.1) | MIT | [LICENSE](licenses/lodash-es@4.18.1/LICENSE) |
| [marked@16.3.0](https://registry.npmjs.org/marked/16.3.0) | MIT | [LICENSE.md](licenses/marked@16.3.0/LICENSE.md) |
| [mermaid@12.2.0](https://registry.npmjs.org/mermaid/12.2.0) | MIT | [LICENSE](licenses/mermaid@12.2.0/LICENSE) |
| [roughjs@4.6.6](https://registry.npmjs.org/roughjs/4.6.6) | MIT | [LICENSE](licenses/roughjs@4.6.6/LICENSE) |
| [stylis@4.3.6](https://registry.npmjs.org/stylis/4.3.6) | MIT | [LICENSE](licenses/stylis@4.3.6/LICENSE) |
| [ts-dedent@2.2.0](https://registry.npmjs.org/ts-dedent/2.2.0) | MIT | [LICENSE](licenses/ts-dedent@2.2.0/LICENSE) |
| [uuid@14.0.0](https://registry.npmjs.org/uuid/14.0.0) | MIT | [LICENSE.md](licenses/uuid@14.0.0/LICENSE.md) |

