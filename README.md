leaflet.g2search
========

Leaflet search plugin using geoportal.gov.pl data

### Usage ###

Download or clone this repo, then build it with:
```
npm install
gulp build
```

### External dependency ###

This plugin depends on `https://github.com/Esri/esri-leaflet` to convert result data to GeoJson, so remember to include it somehow to page e.g: 
```
<script src="https://unpkg.com/esri-leaflet@2.1.1"></script>
```

### Example ###
to run example localy with live-server:
```
npm serve
```
if everything is ok, new browser windows should be opened with directory listing, then go to
```
examples/index.html
```
to constantly update dist folder run
```
gulp
```