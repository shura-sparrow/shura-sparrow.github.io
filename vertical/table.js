window.onload = function() {
    var rotation = {
        checkProperty: function(property) {
            return property in document.body.style;
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")
        },
        generateVertical: function(){
            var table, cells, params, supportCondition,innerTextStr, supportSvg;
            // check contemporary properties
            supportCondition = rotation.checkProperty('OTransform') ||
            rotation.checkProperty('MozTransform') ||
            rotation.checkProperty('webkitTransform') ||
            rotation.checkProperty('msTransform') ||
            rotation.checkProperty('transform') ||
            !! window.ActiveXObject;
            supportSvg = rotation.supportsSvg();
            if (!supportCondition) {
                cells = document.getElementById('dataHeader').getElementsByTagName('span');

                for (var i = 0; i < cells.length; i++) {
                    cells[i].className = cells[i].className + ' no-before';
                    // if there svg support
                    if (supportSvg) {
                        params = {
                            width: cells[i].offsetWidth,
                            height: cells[i].offsetHeight,
                            text: cells[i].innerHTML,
                            fontFamily: window.getComputedStyle(cells[i], null).fontFamily,
                            fontSize: window.getComputedStyle(cells[i], null).fontSize,
                            num: i
                        };
                        rotation.createSvgElement(cells[i], params);
                    } else {
                        // if there's no svg support
                        innerTextStr = '';
                        for(var j = 0; j < cells[i].innerHTML.length; j++) {
                            innerTextStr += cells[i].innerHTML.charAt(j) + '<br>';
                        }
                        cells[i].innerHTML = innerTextStr;
                        cells[i].style.lineHeight = '1';
                    }

                }
            }
        },
        createSvgElement: function(cell, params){
            // create svg object
            var object = document.createElement('object');
            object.type = "image/svg+xml";
            object.data = "data:image/svg+xml; charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'>" +
            "<text x='" + -params.width + "px' y='" + params.height + "px' font-family='" + params.fontFamily + "' font-size='" + params.fontSize +"' fill='#000000' transform='rotate(-90)' " +
            "text-rendering='optimizeSpeed'>"+ params.text +"</text></svg>";
            object.id = 'id' + params.num;
            // set sizes for object
            object.width = params.height + 5 + 'px';
            object.height = params.width + 'px';
            // append object
            cell.removeChild(cell.firstChild);
            cell.appendChild(object);
            cell.style.height = params.width + 'px';
        }
    };
    rotation.generateVertical();
};