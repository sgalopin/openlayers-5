# openlayers-5
Test of Openlayers 5

#### Note:
Doesn't work for now. The following error is returned:
Uncaught TypeError: Failed to resolve module specifier "../../extent.js". Invalid relative url or base scheme isn't hierarchical.
This is due to the packagemap-polyfill parser, which doesn't manage the import on multiples lignes.

#### TODO: Find an other way to manage the bare import specifiers.