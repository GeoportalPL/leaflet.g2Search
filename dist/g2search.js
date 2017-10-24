L.Control.G2Search=L.Control.extend({options:{position:"topleft",searchText:"Search",url:"https://mapy.geoportal.gov.pl/iMapLite/g2search",wkid:2180,proj4def:"+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs",searchIndex:0,searchRows:10,searchTemplate:"where={search}&spatialReference={wkid}&start={searchIndex}&rows={searchRows}&sort=tr",autouggestTemplate:"autosuggest=true&asvalue={search}&f=json",minLength:3,_idField:"OBJECTID",showPopup:!0,selectionStyle:null,popupTemplate:"<img src='{icon}'/><br/>{text}<br/>{details}",zoomTo:!0,hideResultOnSelect:!1},onAdd:function(A){var e="leaflet-control-g2search",t=L.DomUtil.create("div",e+" leaflet-bar"),s=this.options;return L.DomEvent.disableClickPropagation(t),L.DomEvent.disableScrollPropagation(t),this._g2searchForm=L.DomUtil.create("form",e+"-form",t),this._g2searchForm.setAttribute("onsubmit","return false;"),this._g2searchInput=L.DomUtil.create("input",e+"-input",this._g2searchForm),this._g2searchInput.placeholder=s.searchText,this._g2searchInput.setAttribute("required",""),L.DomEvent.on(this._g2searchInput,"keydown",this._inputKeydownHandler,this),L.DomEvent.on(this._g2searchInput,"input",this._inputInputHandler,this),L.DomEvent.on(this._g2searchInput,"focus",this._inputFocusHandler,this),this._g2searchClear=L.DomUtil.create("input",e+"-clear-icon",this._g2searchForm),this._g2searchClear.type="reset",this._g2searchClear.value="",L.DomEvent.on(this._g2searchClear,"click",this._inputInputHandler,this),this._g2searchSuggestions=L.DomUtil.create("div",e+"-suggestions",t),this._g2searchResults=L.DomUtil.create("div",e+"-results",t),t},onRemove:function(A){},_sendSearchPost:function(A){this._g2SearchSearchXHR||(this._g2SearchSearchXHR=new XMLHttpRequest,this._g2SearchSearchXHR.onload=this._searchXHRLoad.bind(this),this._g2SearchSearchXHR.onerror=this._searchXHRError.bind(this)),this._g2SearchSearchXHR.open("POST",this.options.url,!0),this._g2SearchSearchXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8"),this._g2SearchSearchXHR.send(L.Util.template(this.options.searchTemplate,L.Util.extend({search:A},this.options))),this._showProgress()},_sendAutosuggestPost:function(A){this._g2SearchAutosuggestXHR?this._g2SearchAutosuggestXHR.abort():(this._g2SearchAutosuggestXHR=new XMLHttpRequest,this._g2SearchAutosuggestXHR.onload=this._autosuggestXHRLoad.bind(this)),this._g2SearchAutosuggestXHR.open("POST",this.options.url,!0),this._g2SearchAutosuggestXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8"),this._g2SearchAutosuggestXHR.send(L.Util.template(this.options.autouggestTemplate,L.Util.extend({search:A},this.options)))},_showProgress:function(){L.DomUtil.empty(this._g2searchResults);L.DomUtil.create("img",null,this._g2searchResults).src="data:image/gif;base64,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"},_searchXHRLoad:function(A){if(A&&A.target&&200===A.target.status){var e=JSON.parse(A.target.responseText);this._handleSearchResponse(e.response)}},_searchXHRError:function(A){console.error("error",A)},_autosuggestXHRLoad:function(A){if(A&&A.target&&200===A.target.status){var e=JSON.parse(A.target.responseText);this._handleAutosuggestResponse(e.suggestions)}},_handleSearchResponse:function(A){this.options.searchIndex=A.start,this.searchResults=this._mapResults(A.docs),this.notFount=!this.searchResults||0===this.searchResults.length,this.searchResults&&(1===this.searchResults.length?(this._resultClicked(0).bind(this)(null),this._rebuildResultDOM(null),this._handleAutosuggestResponse(null)):this.searchResults.length>1&&this._rebuildResultDOM(this.searchResults))},_handleAutosuggestResponse:function(A){if(L.DomUtil.empty(this._g2searchSuggestions),this._autosuggestSelectElement=null,A){this._autosuggestSelectElement=L.DomUtil.create("select",void 0,this._g2searchSuggestions),L.DomEvent.on(this._autosuggestSelectElement,"click",this._handleAutosuggestChange,this),L.DomEvent.on(this._autosuggestSelectElement,"keydown",this._handleAutosuggestKeydown,this),this._autosuggestSelectElement.size=10;this._autosuggestSelectElement.innerHTML=A.map(function(A){return L.Util.template("<option>{value}</option>",{value:A})}).join()}},_handleAutosuggestChange:function(A){this._g2searchInput.value=A.target.value,this._g2searchInput.focus(),this._sendSearchPost(this._g2searchInput.value),this._handleAutosuggestResponse(null)},_handleAutosuggestKeydown:function(A){13===A.which&&(this._g2searchInput.value=this._autosuggestSelectElement.value,this._g2searchInput.focus(),this._sendSearchPost(this._g2searchInput.value),this._handleAutosuggestResponse(null))},_mapResults:function(A){return A.map(function(A){var e=this._getResultTemplate(A.imapid);return e?(e.text=L.Util.template(e.text,A.json.attributes),e.text=e.text.replace(/null/g,""),e.details=L.Util.template(e.details,A.json.attributes),e.details=e.details.replace(/null/g,""),e.json=A.json,e.extent={xmin:A.xmin,ymin:A.ymin,xmax:A.xmax,ymax:A.ymax},e.center={x:A.xc,y:A.yc}):e={text:A.full,details:"",icon:"images/poi/prng.png",json:A.json},e},this)},_getResultTemplate:function(A){var e=null;switch(A){case"geopard.PRGPowiaty":e={text:"{POWIAT}",details:"powiat",icon:"images/poi/prg-powiaty.png"};break;case"geopard.PRGGminy":e={text:"{NAZWA}",details:"gmina",icon:"images/poi/prg-gminy.png"};break;case"geopard.PRNG":e={text:"{NAZWA_MIANOWNIK}, {RODZAJ_OPIS}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}",icon:"images/poi/prng.png"};break;case"geopard.PRNG_Hydro":e={text:"{NAZWA_MIANOWNIK}, {RODZAJ_OPIS}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}",icon:"images/poi/prng-hydro.png"};break;case"geopard.PRNG_Fizjo":e={text:"{NAZWA_MIANOWNIK}, {RODZAJ_OPIS}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}",icon:"images/poi/prng-fizjo.png"};break;case"geopard.PRNG_Hydro_rzeki":e={text:"{NAZWA_MIAN}",details:"{RODZAJ}",icon:"images/poi/prng-hydro-rzeki.png"};break;case"geopard.adresy_solr":e={text:"{NAZWA_ULICY} {NR_ADR}, {MIEJSCOWOSC}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}",icon:"images/poi/adresy-solr.png"};break;default:e=null}return e},_rebuildResultDOM:function(A){if(L.DomUtil.empty(this._g2searchResults),A){var e=L.DomUtil.create("ul",void 0,this._g2searchResults),t=0;A.forEach(function(A){var s=L.DomUtil.create("li",void 0,e);s.innerHTML=L.Util.template("<div class='icon'><img src='{icon}'/></div><div class='text'>{text}</div><div class='details'>{details}</div>",A),L.DomEvent.on(s,"click",this._resultClicked(t++),this)},this)}},_resultClicked:function(A){return function(e){this._clearGraphics();var t=this.searchResults[A];if(t.json){void 0===proj4.defs["EPSG:"+this.options.wkid]&&this.options.proj4def&&proj4.defs("EPSG:"+this.options.wkid,this.options.proj4def);var s=L.esri.Util.arcgisToGeoJSON(t.json,this.options._idField);s.crs={type:"name",properties:{name:"EPSG:"+this.options.wkid}},this._searchGeoJson=L.Proj.geoJson(s,this.options.selectionStyle?{style:this.options.selectionStyle}:null).addTo(this._map),this.options.popupTemplate&&this.options.popupTemplate.length>0&&(this._searchGeoJson.bindPopup(L.Util.template(this.options.popupTemplate,t)),this.options.showPopup&&setTimeout(function(){this._searchGeoJson.openPopup()}.bind(this),100)),!1!==this.options.zoomTo&&this._map.fitBounds(this._searchGeoJson.getBounds()),this.options.hideResultOnSelect&&this._rebuildResultDOM(null)}}},_clearGraphics:function(){this._searchGeoJson&&this._map.removeLayer(this._searchGeoJson)},_inputKeydownHandler:function(A){if(13===A.which){var e=null;e=A.target.value,this._sendSearchPost(e),this._handleAutosuggestResponse(null)}else 40===A.which&&this._autosuggestSelectElement&&(this._autosuggestSelectElement.focus(),this._autosuggestSelectElement.selectedIndex=0)},_inputInputHandler:function(A){A.target.value.length>=this.options.minLength?this._sendAutosuggestPost(A.target.value):0===A.target.value.length&&(this._handleAutosuggestResponse(null),this._rebuildResultDOM(null),this._clearGraphics())},_inputFocusHandler:function(A){this.options.hideResultOnSelect&&this.searchResults&&this.searchResults.length>1&&this._rebuildResultDOM(this.searchResults)}}),L.control.g2search=function(A){return new L.Control.G2Search(A)};