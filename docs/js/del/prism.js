


//material change example
var _material;

//var data = JSON.parse('{"swatch":"torus","company":"Autodesk","categories":["Paint","Metal Flake"],"layered_f0":{"value":0.060270250000000025},"private_tags":["adsk.raas:asset.name:Prism-012","adsk.raas:asset.immutable:Prism-012_c27c9b5d0a354556b9b521d32be582f6.json","Prism-012","Prism.Fusion.2016","prism"],"protein_type":"PrismLayered","layered_albedo":{"value":{"linearFloat":[1,1,1]}},"layered_normal":{"texture":[{"version":1,"contentId":"urn:adsk.content:content:48075ee3-ecbf-4770-aa8a-71dfcae9bed3","libraryId":"urn:adsk.content:library:32b16a35-0c41-49f3-a772-780d96fe7d55"}]},"surface_albedo":{"value":{"linearFloat":[1,1,1]}},"layered_diffuse":{"value":{"linearFloat":[0.0586444,0.305361,0.0642553]}},"layered_fraction":{"value":0.5},"layered_ndf_type":"ggx","layered_rotation":{"unit":"degree","value":0},"surface_ndf_type":"ggx","surface_rotation":{"unit":"degree","value":0},"layered_bottom_f0":{"value":{"linearFloat":[0.0586444,0.305361,0.0642553]}},"layered_roughness":{"value":0.07745966692414834},"surface_roughness":{"value":0},"layered_anisotropy":{"value":0},"surface_anisotropy":{"value":0},"protein_schema_setid":1,"protein_schema_version":1}');
var data = JSON.parse('{"swatch":"torus","company":"Autodesk","opaque_f0":{"value":0.05289999999999999},"categories":["Plastic","Opaque"],"opaque_mfp":{"unit":"millimeter","value":0.5},"private_tags":["adsk.raas:asset.name:Prism-121","adsk.raas:asset.immutable:Prism-121_40fb21d06e8b417e916fe7fa85bcdbdb.json","Prism-121","Prism.Fusion.2016","prism"],"protein_type":"PrismOpaque","opaque_albedo":{"value":{"linearFloat":[0.55,0.035,0.02]}},"surface_albedo":{"value":{"linearFloat":[1,1,1]}},"opaque_emission":false,"opaque_luminance":0,"surface_ndf_type":"ggx","surface_rotation":{"unit":"degree","value":0},"surface_roughness":{"value":0.7071067811865476},"surface_anisotropy":{"value":0},"opaque_mfp_modifier":{"value":{"linearFloat":[1,1,1]}},"opaque_translucency":false,"protein_schema_setid":1,"protein_schema_version":1,"opaque_luminance_modifier":{"value":{"linearFloat":[1,1,1]}}}');

  function parseMaterialColor(val, linear = true, defaultColor = new THREE.Color(1, 1, 1)) {
    val = (val || {}).value || {};
    let k = defaultColor;
    if (val.srgb24bit && val.srgb24bit.length >= 3) {
      let [r, g, b] = val.srgb24bit.slice(0, 3).map(v => v / 255);
      if (linear) {
        [r, g, b] = [r, g, b].map(sRGBToLinearFloat)
      }
      k.setRGB(r, g, b);
    } else if (val.linearFloat && val.linearFloat.length >= 3) {
      let [r, g, b] = val.linearFloat.slice(0, 3);
      if (!linear) {
        [r, g, b] = [r, g, b].map(linearFloatToSRGB);
      }
      k.setRGB(r, g, b);
    }
    return k;
  }

  function parseMaterialGenericTexture(val) {
    if (val && val.texture) {
      return val.texture[0];
    } else {
      return undefined;
    }
  }


function initMaterial() {
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback);

    var initPrismMaterial = function() {
		let tm = Autodesk.Viewing.Private.createPrismMaterial();
	    //tm.side = THREE.DoubleSide;
	    tm.transparent = false;
	    tm.envExponentMin = 1.0;
	    tm.envExponentMax = 512.0;
	    tm.envExponentCount = 10.0;

	    let tx = {};

	    tm.surface_albedo = parseMaterialColor(data.surface_albedo);
	    tx.surface_albedo = parseMaterialGenericTexture(data.surface_albedo);
	    //tm.surface_anisotropy = parseMaterialGenericValue(data.surface_anisotropy);
	    //tx.surface_anisotropy = parseMaterialGenericTexture(data.surface_anisotropy);
	    //tx.surface_cutout = parseMaterialDirectTexture(data.surface_cutout);
	    //tm.surface_ndf_type = NDF_TYPES[data.surface_ndf_type] || 1;
	    //tx.surface_normal = parseMaterialGenericTexture(data.surface_normal);
	    //tm.surface_rotation = parseMaterialAngle(data.surface_rotation, true);
	    //tx.surface_rotation = parseMaterialGenericTexture(data.surface_rotation);
	    //tm.surface_roughness = parseMaterialGenericValue(data.surface_roughness, 0.2);
	    tx.surface_roughness = parseMaterialGenericTexture(data.surface_roughness);


	    tm.metal_f0 = parseMaterialColor(data.metal_f0, true);
	    tx.metal_f0 = parseMaterialGenericTexture(data.metal_f0);

	    _material = data;

	    viewer.impl.matman().addMaterial(
	        'prism-123',
	        _material,
	        true
	    );
    }
    initPrismMaterial();

}

function onSelectedCallback(event) {
    if (event.dbIdArray.length) {
        viewer.select([]);
        event.fragIdsArray.forEach(function(fragId) {
            if (typeof _material == 'string') {
                var renderProxy = viewer.impl.getRenderProxy(viewer.model, fragId);
                setMaterialOverlay(renderProxy, _material);
            } else {
                viewer.model.getFragmentList().setMaterial(fragId, _material);
                viewer.impl.invalidate(true);
            }
        });
    }
}