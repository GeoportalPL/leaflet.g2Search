L.Control.G2Search=L.Control.extend({options:{position:"topleft",searchText:"Search",url:"https://mapy.geoportal.gov.pl/iMapLite/g2search",wkid:2180,proj4def:"+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs",searchIndex:0,searchRows:10,searchTemplate:"where={search}&spatialReference={wkid}&start={searchIndex}&rows={searchRows}&sort=tr",autouggestTemplate:"autosuggest=true&asvalue={search}&f=json",minLength:3,_idField:"OBJECTID",showPopup:!0,selectionStyle:null,popupTemplate:"<img src='{icon}'/><br/>{text}<br/>{details}",zoomTo:!0,hideResultOnSelect:!1,customImages:null},onAdd:function(A){var e="leaflet-control-g2search",t=L.DomUtil.create("div",e+" leaflet-bar"),s=this.options;return L.DomEvent.disableClickPropagation(t),L.DomEvent.disableScrollPropagation(t),this._g2searchForm=L.DomUtil.create("form",e+"-form",t),this._g2searchForm.setAttribute("onsubmit","return false;"),this._g2searchInput=L.DomUtil.create("input",e+"-input",this._g2searchForm),this._g2searchInput.placeholder=s.searchText,this._g2searchInput.setAttribute("required",""),L.DomEvent.on(this._g2searchInput,"keydown",this._inputKeydownHandler,this),L.DomEvent.on(this._g2searchInput,"input",this._inputInputHandler,this),L.DomEvent.on(this._g2searchInput,"focus",this._inputFocusHandler,this),this._g2searchClear=L.DomUtil.create("input",e+"-clear-icon",this._g2searchForm),this._g2searchClear.type="reset",this._g2searchClear.value="",L.DomEvent.on(this._g2searchClear,"click",this._inputInputHandler,this),this._g2searchSuggestions=L.DomUtil.create("div",e+"-suggestions",t),this._g2searchResults=L.DomUtil.create("div",e+"-results",t),t},onRemove:function(A){},_sendSearchPost:function(A){this._g2SearchSearchXHR||(this._g2SearchSearchXHR=new XMLHttpRequest,this._g2SearchSearchXHR.onload=this._searchXHRLoad.bind(this),this._g2SearchSearchXHR.onerror=this._searchXHRError.bind(this)),this._g2SearchSearchXHR.open("POST",this.options.url,!0),this._g2SearchSearchXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8"),this._g2SearchSearchXHR.send(L.Util.template(this.options.searchTemplate,L.Util.extend({search:A},this.options))),this._showProgress()},_sendAutosuggestPost:function(A){this._g2SearchAutosuggestXHR?this._g2SearchAutosuggestXHR.abort():(this._g2SearchAutosuggestXHR=new XMLHttpRequest,this._g2SearchAutosuggestXHR.onload=this._autosuggestXHRLoad.bind(this)),this._g2SearchAutosuggestXHR.open("POST",this.options.url,!0),this._g2SearchAutosuggestXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8"),this._g2SearchAutosuggestXHR.send(L.Util.template(this.options.autouggestTemplate,L.Util.extend({search:A},this.options)))},_showProgress:function(){L.DomUtil.empty(this._g2searchResults);L.DomUtil.create("img",null,this._g2searchResults).src="data:image/gif;base64,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"},_searchXHRLoad:function(A){if(A&&A.target&&200===A.target.status){var e=JSON.parse(A.target.responseText);this._handleSearchResponse(e.response)}},_searchXHRError:function(A){console.error("error",A)},_autosuggestXHRLoad:function(A){if(A&&A.target&&200===A.target.status){var e=JSON.parse(A.target.responseText);this._handleAutosuggestResponse(e.suggestions)}},_handleSearchResponse:function(A){this.options.searchIndex=A.start,this.searchResults=this._mapResults(A.docs),this.notFount=!this.searchResults||0===this.searchResults.length,this.searchResults&&(1===this.searchResults.length?(this._resultClicked(0).bind(this)(null),this._rebuildResultDOM(null),this._handleAutosuggestResponse(null)):this.searchResults.length>1&&this._rebuildResultDOM(this.searchResults))},_handleAutosuggestResponse:function(A){if(L.DomUtil.empty(this._g2searchSuggestions),this._autosuggestSelectElement=null,A){this._autosuggestSelectElement=L.DomUtil.create("select",void 0,this._g2searchSuggestions),L.DomEvent.on(this._autosuggestSelectElement,"click",this._handleAutosuggestChange,this),L.DomEvent.on(this._autosuggestSelectElement,"keydown",this._handleAutosuggestKeydown,this),this._autosuggestSelectElement.size=10;this._autosuggestSelectElement.innerHTML=A.map(function(A){return L.Util.template("<option>{value}</option>",{value:A})}).join()}},_handleAutosuggestChange:function(A){this._g2searchInput.value=A.target.value,this._g2searchInput.focus(),this._sendSearchPost(this._g2searchInput.value),this._handleAutosuggestResponse(null)},_handleAutosuggestKeydown:function(A){13===A.which&&(this._g2searchInput.value=this._autosuggestSelectElement.value,this._g2searchInput.focus(),this._sendSearchPost(this._g2searchInput.value),this._handleAutosuggestResponse(null))},_imageFactory:function(){var A={"geopard.adresy_solr":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAclBMVEX/////0QD/xwAAAAD/2QD/vQD/zQD/1QD/ywD/wQD/uQD/xAD/3QD/tQD/swDmrADmwQDmvQDmtAD/4A3/twzmuAD/0Q3/xQ3msAD/1Q3/ug3/vQ7/3Q3/2Q3/wA3mpgD/ygzmxQDmugD/zgz/0Rr/yhqHEduvAAABY0lEQVQ4y43TCW6DMBBAUaC4xlCgkI2sJKS9/xU7mz1NnEK/hJCsJxkvJCvtxJ2pvbTlvpLVRyj3WSqV3qHirjB2lhg5D2OGSB1BYerymBXZleENA/WJgeswguIE5rcEA0hvm3b0JkaOYZ57aBmmCtkRPCm0AaYCmQnMX8Cum6YN5l21A4g9wzefOIG6WoGTQnIC49VuFCIjeAanU0aw74cBnCNo5yAOOEfQRrBQOCi0ESxiaC4AdbXvk8D+CRqB4SQEZlmADgcMwv3vm7whKJsMOQwYQ3UCxQk0HoLRsyXYQwPWcgiPApPZTFkKnOZhiXCLX/cvKKtdhvRnLMIDQr3xPY3z7nElVdcI1Sk0wSlE1mOwyYPAlhvHsYSnrhUSqDw0bRIa4SF4x2kfoXkB18k9y5Zh0zxC187Aq0L3F2wCrAQ6gaXCWqFe0afNoxqIYbXsFHoWO4XfO+7CHbkDtw4dfgCxkC+iu2oh5QAAAABJRU5ErkJggg==","geopard.PRGGminy":"data:image/png;base64,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","geopard.PRGPowiaty":"data:image/png;base64,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","geopard.PRNG_Fizjo":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAwFBMVEX/873/9ML/8a//87r/8Kz/9cj/9cUyLyj/8bL/99H/8bX/9s3/8rf/9sv/9s//+Nb/88AyLyX/99P/+Nf/76n/76f/+Nn/+ds/OzFlYU9MSD3y6sXMxKKyq4t/eWDY0rfy57LMxqqYkXN/emVZVUfy6Lvl3rrY0a6yrJelnoOYk4CYknlMSDny6b/l2qp/e2p/emdlYVVZVEXy6svl3r3l26/YzqHYzZy/t5e/tYulm3aMhWZybl5ybVlZVUpZVEi/ZnQ4AAACHklEQVQ4y4XS2XbaMBAGYBkjCVnYljDBmDVpWEvSJt33vv9bZcbSIOEcTv4LuPnOLNawus0EU2HKshxBlFIFRuscwnnOgsA4olAQgQgIqyfV5LXT3hFLAF6yKw7ghFjXhbYJhmC8ArLYEQz1rpYzBmBn28XTTMrZ/cJP5xhjhlUXbt5In+aRkyNIDN0MzfMz/s621JZhAI7CeP+lnB7quioPUyk31NfD6DGW4NZ1gePtQR7AOZamjJXRttD4rs6XTbMUYgHNuTGOtTC4nZT/an2SkJNIPkn5hRzC8JE1FHlf8Wm7iU7eWXuXeDccpgALegyEiss2ZQuFdwQ1uhZ+VOIvuj+VWWFFchnA6NGgpRLbDXyZz5o9WDsy5LIhU8FxmH8Np7del8p8s3YzQoYOYUEMcoTePIHjgyWg81GjQzYYIAwnuoUPPnePcTu1di6cQ5ixIr7kFewNDAI736tzPQ/D6X2Fko/osOCOn12vlzFNDmECkz1BxfS3K5iR6w2Yjk/ZfLDW7lmKfzvhGDqE+cUp42yNSRtrTyoNzkPHwrY/floL24Mj1u/3WB6VwyytfYBHWeohMnIIydHtNRbSFIYcQU5t6fS+I9zzmDkYO8xwBZ9Gp8F5KIidT+92CpugC2w87jMRpqOT+nXMMyoXw46DGOYdMYTJRVt6jA67uQEYHOSKIxi3JUYOmYfpG+U8NK/HwwTnMqYZu5o4pfcCcttDGADdQbQAAAAASUVORK5CYII=","geopard.PRNG_Hydro_rzeki":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABKVBMVEWI3+yP4u6g6fKc6PGM4e2U5O+C3euR4+6k6/OF3uuZ5/CK4O2W5e9/3OqX5vCp7fSi6vOq7vUeLDCS4++e6PGn7PR82umm7PSu7/Ws7vWa5fCx8PYaKy+v7/aq7PQkNzsgLTGi6fKF3eq/8Pa57vWDu8JWdno4UFUxTVOp6fKn1tyJz9iawMVqjZJYiI8zRUm27fWg5fCY3OaLxs52mp9CXWEqQkew7fSx6/Oo5/Gx4umg3+em3eac0dqN0Nl7ydRxvMiUvsSIvcOJucGJsrhzoqlklZ1OcnhCbnUvREiz8fat6/OJ1uGa1NujzNKhy9F8wcubwcV9ucF4t8B5tb92q7Nlp7Fpn6dem6VtmJ5YkJlfi5FgiZBPg41ef4VHaG1EZGs6WV8hLjGfNAz6AAACS0lEQVQ4y33S53raMBQGYIEXHinBmBkFh1Ew0BQII0mTNHt1773v/yJ6jiQsxX7I98c//D6fdCSRZxs8myzVaq1WKxQKDUipVMlBms0spEk2qizwG5KHiP/r61lMoGEcR2NQ1OSZq1SQSYfMeVAHmK5LO4TIZF16WWSeF8M8hyscwk3edyYZd0EgGDrDAMjqzv51D6RL1BkQDyEu2t0afX2ImYJKuyJAMe3FaIvn9hKdXBaZZQFcjrv76u0jyGzkv+R9qrMMUpWnx66t1PVfZ+W04IBlMgap3b2M6dzvtpsKKwKDFAGq0373w+32Lr8M1elFUlAuY6fnzwft5wrjTtd1C6DqZu1xNrWuzqE85N/+vN1gbPj+MeSNtXSumyGN2D31/d4Y3PBq4fN8RsYcARi/gXfwa+YMr+HTvRh0OoNeOGF14ACWBAs0aMTA3E86/cCzMtHtHq+D6ADjy71CNkLmFXF7NLw8RsdhRXkDB6eng86474lpI0ppdILMtl2SU5+KEwR1ecj6+favMHyBDmH8RB3l8MSpGJOP9Ny1IYTkZJ9g6OJpv9GjjG2bJiFN1SmXIcaNFnuuhMASb0Aw8on+6ANDmNWSb0Ay8iVcHNZNjA1wxfYgNzSa7rPCNZsEyaci+47pn8N9lzmEK7aHp0d7O7wPoZbenssY5CcNb06AQVpEk4eScFD24Zr+JQLWU8vGDqIPjyZLmJwWw5iYwgZWLpsA1e3JPu54ygzKU1nJOAR2f52ARrrPTDjMGqnLQ1R7iY1ptVomD/kP0ARZgdXDr1AAAAAASUVORK5CYII=","geopard.PRNG_Hydro":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABHVBMVEWC3eug6fKF3uuH3+yb6PGj6/On7fSZ5vCP4u6N4e0eLDCe6PGr7vV/3OqR4+6V5O+K4O2l6/OU5O+q7fSW5vAcKy+I4Oyu7/Z92umh6vKS4++b5fAnODyy8PZ82um07PS47vUgLTCp6/Ol6vN3t8BbiZCF3eo5WWCw7/aj6fKj5/GK0NiYyM9gi5FDZmxFXWE7UVUsQ0iv6/Oo6PKf5vCh1Nt9pap2oqpoi5Jef4Wh5/CW09t0rbRlnqZ0mJ5sjZJZdXpNcnlOaW5LZ2w5T1Sv4eme3+eW3OWP2uSR0tuFzdidydB8wcuQvcSFtLxjlJxVho9Oe4MwREkqQki28fao3ueV2+SJ1+KI1+J9ydVtpq5sl51mlpw+W2AxRUnzu5iIAAACh0lEQVQ4y4XTZ3PiQAwGYGF8wZjENiYmxc65gGmBQOikB0jvuV7//8847a7AjGHm3k/M8Iy02pXh855IpVLZElnH5DDBWraAqVYTmCrsRf/y/9cw2ewHzA4DmUxGluVUShYwYjEnGMZGGC+3ym0yGLHI7ewIhmFsU2eQ3OrjkdNTUFnVNmLkTAFzyy5qi840TR22Ym75eDrCXYSrp43KMaZpCFffHkFyHBI7jk27/xKGj4yZyBTFhC0q1/g7WJj266XKclhk5RTMLqzT8Rq+37qbtT1xVNVpviN9ES6NkMa4G/u+0xBdD5Cde177qeX0aoyl0xpCmqLQd5BehiEytfXgBXg8u+fq6ASMpj2+8H1EvJxrm8V7HMPkzjAUyJEbNG4yid5Zs9m86F95nWJZtazD1+/ImMunIUeP0fCd37KcCFzXbddusT1CpI/I0CXTENCbnTi+OtkXj1E8VNXp81X9wrIGJmNJDumWr8dY5bJ4e39axh9Dr21r+vPItY28gNn5m2XOHJXSqns1PoVe4/UkyYACPUYR216ftxgb9722fnpQLr/9MITjUDg5VA/2N1OB+/TgeUH35yeL55WclIcCrUqI13fCVsVOad/e0EyGI8eyQu4A8lCdrdQvPOEfvgSnWG5adzvdm9H0iy1xmITqfPOOm2xfymULM3IDDbsa3U6SMQYTCx/Q4N3imdTdGr8UVMKBxGC0yUf1s+Gw33M7mjFzwLMhQWbxy1AUvXt0ZCvEIsfhohO7suQ4JIaOmHASCzFMCWQ9KhdzEdveLoG91HbuYpCxWNtkjGEAYex4y30xHwFSxDCrGXcMIvtfOQyAvlwP4g6zAfbCJVJdmhtTKpVAJPkPWPBo6xFl7XAAAAAASUVORK5CYII=","geopard.PRNG":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAolBMVEUyLyf/9s0yLyX/8a//99H/8Kz/9cf/8rn/9ML/87z/99T/877/+Nf/8rf/9sr/76j/9MT/8bP/9MD/8bH/8bX/+dry6sV/embMxKJMSD7l266ln4V/eWFlYE9ZVEfy6b3MxaiyrJBMSD0/Oy/l3ruyqoeMh3eYknY/PDPy69Dl3r3l3bjy57TY0K/y5q2/uaPYzZy/tpKlm3Zybl9ybVg/Oi735iGPAAAByElEQVQ4y4XT2XbiMBAE0BYG26DgyMYxOwxkssy+5v9/Lb0Il3xITuqJh3u61VDQHXJjmUnGGiepNBQFDISaXBJCIGbXoyLjRFYKHIx7xwkEg0vXCiubkiGcQveWE/jB80p1vmE4XLtaronOy1WeOO8ZDl23p5j9sV97gWCuW1Of9VHHKZtOPQ2ed6AkhwCnEFecaJBTZJxiyhDX2uLnx8dnkpyr6IqCYeK+2du+3I27M0m+mjMI51Yk2d7wtQ/8YTT61MR583nBUBngLxdC+cdgiE4hfgyD/yo+9j8zhiUzdS3DpAOkWW42u5Fm1lxcO6e0K/3XaO4wE6auFogObOEkW8dOWa0QXTnCSbqgTuCiZVihejtjluVYnLLFoqZBQzfmLJ/z3mUZYNBO6bkY2EancND4TTrQmLpsQS51jX+6uKdxASewSpn33+/N3XclszqyySRjGKLz2pUHgyc3T5xBdajoXtzeeVsLmNs/AxX9LfBHzg5MIVzs1I6/GlfAASrzffV+vvAlshbs9nZCeYO1sQN/t66+jAMMV66tvYdTJrDE64zhWrAEoqICh85gg3lgiQP8YBzg1fM00SFU8mrczNY0uCV7BSmCO/TduvvWAAAAAElFTkSuQmCC"};return function(e){return this.options&&this.options.customImages&&this.options.customImages[e]?this.options.customImages[e]:A[e]}}(),_mapResults:function(A){return A.map(function(A){var e=this._getResultTemplate(A.imapid);return e?(e.icon=this._imageFactory(A.imapid),e.text=L.Util.template(e.text,A.json.attributes),e.text=e.text.replace(/null/g,""),e.details=L.Util.template(e.details,A.json.attributes),e.details=e.details.replace(/null/g,""),e.json=A.json,e.extent={xmin:A.xmin,ymin:A.ymin,xmax:A.xmax,ymax:A.ymax},e.center={x:A.xc,y:A.yc}):e={text:A.full,details:"",icon:this._imageFactory("geopard.PRNG"),json:A.json},e},this)},_getResultTemplate:function(A){var e=null;switch(A){case"geopard.PRGPowiaty":e={text:"{POWIAT}",details:"powiat"};break;case"geopard.PRGGminy":e={text:"{NAZWA}",details:"gmina"};break;case"geopard.PRNG":case"geopard.PRNG_Hydro":case"geopard.PRNG_Fizjo":e={text:"{NAZWA_MIANOWNIK}, {RODZAJ_OPIS}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}"};break;case"geopard.PRNG_Hydro_rzeki":e={text:"{NAZWA_MIAN}",details:"{RODZAJ}"};break;case"geopard.adresy_solr":e={text:"{NAZWA_ULICY} {NR_ADR}, {MIEJSCOWOSC}",details:"gm. {GMINA}, pow. {POWIAT}, woj. {WOJEWODZTWO}"};break;default:e=null}return e},_rebuildResultDOM:function(A){if(L.DomUtil.empty(this._g2searchResults),A){var e=L.DomUtil.create("ul",void 0,this._g2searchResults),t=0;A.forEach(function(A){var s=L.DomUtil.create("li",void 0,e);s.innerHTML=L.Util.template("<div class='icon'><img src='{icon}'/></div><div class='text'>{text}</div><div class='details'>{details}</div>",A),L.DomEvent.on(s,"click",this._resultClicked(t++),this)},this)}},_resultClicked:function(A){return function(e){this._clearGraphics();var t=this.searchResults[A];if(t.json){void 0===proj4.defs["EPSG:"+this.options.wkid]&&this.options.proj4def&&proj4.defs("EPSG:"+this.options.wkid,this.options.proj4def);var s=L.esri.Util.arcgisToGeoJSON(t.json,this.options._idField);s.crs={type:"name",properties:{name:"EPSG:"+this.options.wkid}},this._searchGeoJson=L.Proj.geoJson(s,this.options.selectionStyle?{style:this.options.selectionStyle}:null).addTo(this._map),this.options.popupTemplate&&this.options.popupTemplate.length>0&&(this._searchGeoJson.bindPopup(L.Util.template(this.options.popupTemplate,t)),this.options.showPopup&&setTimeout(function(){this._searchGeoJson.openPopup()}.bind(this),100)),!1!==this.options.zoomTo&&this._map.fitBounds(this._searchGeoJson.getBounds()),this.options.hideResultOnSelect&&this._rebuildResultDOM(null)}}},_clearGraphics:function(){this._searchGeoJson&&this._map.removeLayer(this._searchGeoJson)},_inputKeydownHandler:function(A){if(13===A.which){var e=null;e=A.target.value,this._sendSearchPost(e),this._handleAutosuggestResponse(null)}else 40===A.which&&this._autosuggestSelectElement&&(this._autosuggestSelectElement.focus(),this._autosuggestSelectElement.selectedIndex=0)},_inputInputHandler:function(A){A.target.value.length>=this.options.minLength?this._sendAutosuggestPost(A.target.value):0===A.target.value.length&&(this._handleAutosuggestResponse(null),this._rebuildResultDOM(null),this._clearGraphics())},_inputFocusHandler:function(A){this.options.hideResultOnSelect&&this.searchResults&&this.searchResults.length>1&&this._rebuildResultDOM(this.searchResults)}}),L.control.g2search=function(A){return new L.Control.G2Search(A)};