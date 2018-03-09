//material change example
var _material = {};

function initMaterial() {
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback);
    //_material = new THREE.MeshPhongMaterial( { color: 0x704000, side:THREE.DoubleSide, shininess:30.0, specular:1, transparent: false, opacity: 1 } );
    //_material = new THREE.MeshBasicMaterial({ side:THREE.FrontSide, color: 0x704000 });
    //viewer.impl.matman().addMaterial( 'paint', _material, true);
}

function onSelectedCallback(event) {
    //create material
    var color = app.colorlist[app.color];
    var mat = _material[app.color];
    if (!mat) {
        mat = new THREE.MeshBasicMaterial({ side:THREE.FrontSide, color: color });
        _material[app.color] = mat;
        viewer.impl.matman().addMaterial( 'paint'+color, mat, true);
    }

    if (event.dbIdArray.length) {
        viewer.impl.selector.clearSelection();
        event.fragIdsArray.forEach(function(fragId) {
            if (typeof _material == 'string') {
                var renderProxy = viewer.impl.getRenderProxy(viewer.model, fragId);
                setMaterialOverlay(renderProxy, mat);
            } else {
                viewer.model.getFragmentList().setMaterial(fragId, mat);
                viewer.impl.invalidate(true);
            }
        });
    }
}