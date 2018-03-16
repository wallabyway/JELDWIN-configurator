var viewer;

//window.devicePixelRatio=4;
//Vue.config.devtools = true;

// Vue.js components
window.app = new Vue({
  el: "#app",
  data: {   
  // camera state
    interior:0,
    viewstate:0,
    mousemoved:false,

  // geometry options state
    grill:0,

  // color state
    wood:0,
    grillcolor:0,
    glass:0,
    frame:0,

    // selection-sets for wood, grill, glass & frame
    frags:{}, 
    wood_SelectionSet: ["P007406-005","P007448-012", "P007550", "P003174", "P004351", "P004358", "P004396", "P004397", "P004354", "P004398"],
    grill_SelectionSet: ["W4500SDLwithShadowBar-32","none","W4500SDLwithShadowBar-31","W4500SDLwithShadowBar-30"],
    frame_SelectionSet: ["P007407", "P003009"],
    glass_SelectionSet: ["4500IGAssy"],
    
    // selector-toolbars for interior/exterior view, wood-texture-list, grill-color-list, metal-frame-color and glass-texture-list  
    interiorList: [0,1],
    woodList: [
      {rgb:"#705000", texture:"Jeld-Wen_Alder"}, 
      {rgb:"#6B2112", texture:"1_mats_wood_mahogany"},
      {rgb:"#c0a000", texture:"Jeld-Wen_light"}],
    grillColorList: ["#050304","#F3FAF3"],
    frameColorList: ["#F0E6C3","#0B3328","#2E180D","#6B2112"],
    glassColorList: [      
      {rgb:"#F3F3FF", ior:0.01}, 
      {rgb:"#E0E0FF", ior:0.1}, 
      {rgb:"#D0D0FF", ior:0.5}],
    // list of camera views
    interiorViewList: [
      {"viewport":{"name":"","eye":[-23.934733209144355,1585.5847878552026,-1890.290668372906],"target":[-49.90142686214491,-1156.0759007627867,1479.6832621670778],"up":[-0.004862479443179459,0.7757223164351729,0.6310556584629555],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2475.674726785508,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018228309893}},
      {"viewport":{"name":"","eye":[-459.6334998011404,909.9612568749028,-313.9094690829352],"target":[1548.4306088670037,-2326.0687367134224,1776.518790697155],"up":[0.5160124173969763,0.667211716563466,0.5371775408303682],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[-198.86486957582628,589.8018397895269,-69.14844012260437],"distanceToOrbit":476.78046057132485,"aspectRatio":1.2848575712143928,"projection":"perspective","isOrthographic":false,"fieldOfView":37.03855599660071}},
      {"viewport":{"name":"","eye":[-424.3530075161524,-153.61446026476233,-408.04338135149885],"target":[929.7149726904205,-2945.7164430275966,2632.4776786056254],"up":[0.2614584342997715,0.766130573840962,0.587097462913638],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[-250.94941513556736,-545.110369682312,-24.11333547380883],"distanceToOrbit":574.3543278863577,"aspectRatio":1.2382310984308131,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090183333000017}},
      {"viewport":{"name":"","eye":[210.0360257222195,15.568804714368412,-314.7818780422598],"target":[-202.15148251375894,-3740.6927244605486,1828.74388007366],"up":[-0.16326918388626177,0.5024352845848177,0.8490594551604072],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[99.55294333188816,-543.6509861254374,-16.79009697426656],"distanceToOrbit":641.0199699413025,"aspectRatio":1.2848575712143928,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090183379463298}},    
    ],
    exteriorViewList: [
      {"viewport":{"name":"","eye":[1.3948304776675966,2150.613879984592,1661.0761419912435],"target":[41.78361101778469,-1306.2716410814744,-969.9717735477261],"up":[0.012213289989098961,0.6056849381739119,-0.795610828996757],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2702.5831651822923,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[-1938.5312951199232,1992.7586277325167,1384.4103465483786],"target":[793.0653131778392,-862.3733082399949,-421.3314652668321],"up":[0.5482329645213153,0.7537221977848498,-0.3624133898996367],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.988804954309,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[3180.1270079242804,-83.77588186072347,738.0076454320756],"target":[-1057.3980556166152,-35.107938918820764,-218.60861012930286],"up":[0.010927384556393293,0.9999372515047872,0.002466844099013219],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3254.2835893729575,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[1177.110272600259,-400.3046677968286,510.4695545911544],"target":[-2774.5390951023783,-686.0844418242593,-1271.916231007433],"up":[-0.059963262173177226,0.9978341056975893,-0.02704634349118061],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":1239.6808440502773,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[590.8834442013027,-764.8087836464713,245.37878127485612],"target":[-2269.077574710687,1453.4907563852123,-2157.509483753488],"up":[0.39093943626848104,0.8598140256773992,0.3284603452755099],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[381.25399565696716,-609.4879866070235,54.96504557576213],"distanceToOrbit":322.62504537027473,"aspectRatio":1.2382310984308131,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182318375433}}
    ],
    // get view state from console
    // v=viewer.getState();delete(v.seedURN);delete(v.objectSet);delete(v.renderOptions);delete(v.cutplanes);JSON.stringify(v)
  },

  computed: {
    cameraViewList: function(){ return (!this.interior) ? this.interiorViewList:this.exteriorViewList},
  },

  methods: {
    init: function() {
      this.initializeViewer(this);
    },

    setInterior(i) { this.interior=i; this.viewstate=0; this.setView(0) },
    setGrill(i) { this.grill=i; this.hide("W4500SDL"); this.show( this.grill_SelectionSet[i]); },
    setView(i) { this.viewstate=i; viewer.restoreState(this.cameraViewList[i]); },

    setWoodColor: function(materialName){
      var textureFolder = "../textures/"
      var cm = `${textureFolder}${materialName}_Map.jpg`;
      var bm = `${textureFolder}${materialName}_Bump_Map.jpg`;
      var rm = `${textureFolder}${materialName}_Roughness_Map.jpg`;
      var szPrism = {"0":{"tag":"Prism-149","definition":"PrismOpaque","transparent":false,"keywords":["Wood","Finished"],"categories":["Wood/Finished"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["PrismOpaqueSchema"]},"UIName":{"values":["WindowInterior_Wood_JeldWenAlder_Standard"]},"category":{"values":["Wood/Finished"]},"description":{"values":["Wood - pine finished semigloss"]},"keyword":{"values":["Wood","Finished"]},"opaque_albedo_urn":{"values":["adsk.raas:asset.name:Texture-wood_pine_color"]},"opaque_f0_urn":{"values":[]},"opaque_luminance_modifier_urn":{"values":[]},"opaque_mfp_modifier_urn":{"values":[]},"surface_albedo_urn":{"values":[]},"surface_anisotropy_urn":{"values":[]},"surface_cutout_urn":{"values":[]},"surface_normal_urn":{"values":["adsk.raas:asset.name:Texture-wood_pine_bump"]},"surface_rotation_urn":{"values":[]},"surface_roughness_urn":{"values":["adsk.raas:asset.name:Texture-wood_pine_varnished_rough"]},"swatch":{"values":["Swatch-Torus"]}},"uris":{"thumbnail":{"values":["c:/worker/deploy/Material Library/proteinrun/mgr40_gvtg5v1/deserializexsacfz/4a24e120.png"]}},"booleans":{"Hidden":{"values":[false]},"opaque_emission":{"values":[false]},"opaque_translucency":{"values":[false]}},"integers":{"interior_model":{"values":[0]},"revision":{"values":[1]},"version":{"values":[1]}},"scalars":{"opaque_f0":{"units":"","values":[0.06027]},"opaque_luminance":{"units":"","values":[0]},"opaque_mfp":{"units":"mm","values":[0.5]},"surface_anisotropy":{"units":"","values":[0]},"surface_rotation":{"units":"","values":[0]},"surface_roughness":{"connections":["1"],"units":"","values":[0.2]}},"colors":{"opaque_albedo":{"connections":["2"],"values":[{"r":1,"g":1,"b":1,"a":1}]},"opaque_luminance_modifier":{"values":[{"r":1,"g":1,"b":1,"a":1}]},"opaque_mfp_modifier":{"values":[{"r":1,"g":1,"b":1,"a":1}]},"surface_albedo":{"values":[{"r":1,"g":1,"b":1,"a":1}]}},"textures":{"surface_cutout":{},"surface_normal":{"connections":["3"]}},"choicelists":{"surface_ndf_type":{"values":[1]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["F68E0B00-437E-4E2E-966D-C304F5E4FDBE"]}},"references":{}}},"1":{"tag":"Texture-wood_pine_varnished_rough","definition":"UnifiedBitmap","keywords":[""],"categories":["Roughness Map"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["UnifiedBitmapSchema"]},"UIName":{"values":["wood pine varnished rough"]},"category":{"values":["Roughness Map"]},"description":{"values":[]},"keyword":{"values":[]},"swatch":{"values":[]},"unifiedbitmap_Bitmap_urn":{"values":[]}},"uris":{"thumbnail":{"values":[]},"unifiedbitmap_Bitmap":{"values":[rm]}},"booleans":{"Hidden":{"values":[false]},"common_Tint_toggle":{"values":[false]},"texture_LinkTextureTransforms":{"values":[false]},"texture_OffsetLock":{"values":[false]},"texture_ScaleLock":{"values":[true]},"texture_URepeat":{"values":[true]},"texture_VRepeat":{"values":[true]},"unifiedbitmap_Invert":{"values":[false]}},"integers":{"revision":{"values":[1]},"texture_MapChannel":{"values":[1]},"texture_MapChannel_ID_Advanced":{"values":[1]},"texture_MapChannel_UVWSource_Advanced":{"values":[0]},"unifiedbitmap_Filtering":{"values":[0]},"version":{"values":[1]}},"scalars":{"texture_RealWorldOffsetX":{"units":"in","values":[0]},"texture_RealWorldOffsetY":{"units":"in","values":[0]},"texture_RealWorldScaleX":{"units":"in","values":[9.84252]},"texture_RealWorldScaleY":{"units":"in","values":[9.84]},"texture_UOffset":{"units":"","values":[0]},"texture_UScale":{"units":"","values":[1]},"texture_UVScale":{"units":"","values":[1]},"texture_VOffset":{"units":"","values":[0]},"texture_VScale":{"units":"","values":[1]},"texture_WAngle":{"units":"","values":[0]},"unifiedbitmap_BlueAmount":{"units":"","values":[1]},"unifiedbitmap_Blur":{"units":"","values":[0.01]},"unifiedbitmap_Blur_Offset":{"units":"","values":[0]},"unifiedbitmap_GreenAmount":{"units":"","values":[1]},"unifiedbitmap_RGBAmount":{"units":"","values":[1]},"unifiedbitmap_RedAmount":{"units":"","values":[1]}},"colors":{"common_Tint_color":{"values":[{"r":0.315,"g":0.315,"b":0.315,"a":1}]}},"textures":{},"choicelists":{"common_Shared_Asset":{"values":[0]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["9D88CAED-B25D-4BFE-8477-A829A7755C2B"]}},"references":{}}},"2":{"tag":"Texture-wood_pine_color","definition":"UnifiedBitmap","keywords":[""],"categories":["Color Map"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["UnifiedBitmapSchema"]},"UIName":{"values":["wood pine color"]},"category":{"values":["Color Map"]},"description":{"values":[]},"keyword":{"values":[]},"swatch":{"values":[]},"unifiedbitmap_Bitmap_urn":{"values":[]}},"uris":{"thumbnail":{"values":[]},"unifiedbitmap_Bitmap":{"values":[cm]}},"booleans":{"Hidden":{"values":[false]},"common_Tint_toggle":{"values":[false]},"texture_LinkTextureTransforms":{"values":[true]},"texture_OffsetLock":{"values":[false]},"texture_ScaleLock":{"values":[true]},"texture_URepeat":{"values":[true]},"texture_VRepeat":{"values":[true]},"unifiedbitmap_Invert":{"values":[false]}},"integers":{"revision":{"values":[1]},"texture_MapChannel":{"values":[1]},"texture_MapChannel_ID_Advanced":{"values":[1]},"texture_MapChannel_UVWSource_Advanced":{"values":[0]},"unifiedbitmap_Filtering":{"values":[0]},"version":{"values":[1]}},"scalars":{"texture_RealWorldOffsetX":{"units":"in","values":[0]},"texture_RealWorldOffsetY":{"units":"in","values":[0]},"texture_RealWorldScaleX":{"units":"in","values":[9.84252]},"texture_RealWorldScaleY":{"units":"in","values":[9.84]},"texture_UOffset":{"units":"","values":[0]},"texture_UScale":{"units":"","values":[1]},"texture_UVScale":{"units":"","values":[1]},"texture_VOffset":{"units":"","values":[0]},"texture_VScale":{"units":"","values":[1]},"texture_WAngle":{"units":"","values":[0]},"unifiedbitmap_BlueAmount":{"units":"","values":[1]},"unifiedbitmap_Blur":{"units":"","values":[0.01]},"unifiedbitmap_Blur_Offset":{"units":"","values":[0]},"unifiedbitmap_GreenAmount":{"units":"","values":[1]},"unifiedbitmap_RGBAmount":{"units":"","values":[1]},"unifiedbitmap_RedAmount":{"units":"","values":[1]}},"colors":{"common_Tint_color":{"values":[{"r":0.315,"g":0.315,"b":0.315,"a":1}]}},"textures":{},"choicelists":{"common_Shared_Asset":{"values":[0]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["6A0D28A3-7025-4AB5-8183-474FBFF56FF9"]}},"references":{}}},"3":{"tag":"Texture-wood_pine_bump","definition":"BumpMap","keywords":[""],"categories":["Bump Map"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["BumpMapSchema"]},"UIName":{"values":["wood pine bump"]},"bumpmap_Bitmap_urn":{"values":[]},"category":{"values":["Bump Map"]},"description":{"values":[]},"keyword":{"values":[]},"swatch":{"values":[]}},"uris":{"bumpmap_Bitmap":{"values":[bm]},"thumbnail":{"values":[]}},"booleans":{"Hidden":{"values":[false]},"common_Tint_toggle":{"values":[false]},"texture_LinkTextureTransforms":{"values":[false]},"texture_OffsetLock":{"values":[false]},"texture_ScaleLock":{"values":[true]},"texture_URepeat":{"values":[true]},"texture_VRepeat":{"values":[true]}},"integers":{"revision":{"values":[1]},"texture_MapChannel":{"values":[1]},"texture_MapChannel_ID_Advanced":{"values":[1]},"texture_MapChannel_UVWSource_Advanced":{"values":[0]},"version":{"values":[1]}},"scalars":{"bumpmap_Depth":{"units":"in","values":[0.003]},"bumpmap_NormalScale":{"units":"","values":[1]},"texture_RealWorldOffsetX":{"units":"in","values":[0]},"texture_RealWorldOffsetY":{"units":"in","values":[0]},"texture_RealWorldScaleX":{"units":"in","values":[9.84252]},"texture_RealWorldScaleY":{"units":"in","values":[9.84]},"texture_UOffset":{"units":"","values":[0]},"texture_UScale":{"units":"","values":[1]},"texture_UVScale":{"units":"","values":[1]},"texture_VOffset":{"units":"","values":[0]},"texture_VScale":{"units":"","values":[1]},"texture_WAngle":{"units":"","values":[0]}},"colors":{"common_Tint_color":{"values":[{"r":0.315,"g":0.315,"b":0.315,"a":1}]}},"textures":{},"choicelists":{"bumpmap_Type":{"values":[0]},"common_Shared_Asset":{"values":[0]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["B82BD398-A796-4A4F-8FA4-A66722B9EB7C"]}},"references":{}}}};
      this.initPaint(this.wood_SelectionSet, materialName, szPrism);
      WGS.TextureLoader.loadModelTextures({matman:viewer.impl.matman()},viewer.model);
      viewer.impl.setShadowLightDirection(new THREE.Vector3(-30,120,-30));  //-30,130,-30));
      this.setView(this.viewstate);
    },

    setGrillColor: function(rgb) {
      var materialName = "grill";
      var material = viewer.impl.matman()._materials[ `model:1|mat:${materialName}` ];
      if (material) {
        material.metal_f0.set(rgb);
        viewer.impl.invalidate(true);
        return;
      }
      var szPrism = {"0":{"tag":"Prism-027","definition":"PrismMetal","transparent":false,"keywords":["Metal","Aluminum","materials","metal"],"categories":["Metal/Aluminum","Default"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["PrismMetalSchema"]},"UIName":{"values":["Prism-027"]},"category":{"values":["Metal/Aluminum","Default"]},"description":{"values":["Aluminum - polished"]},"keyword":{"values":["Metal","Aluminum","materials","metal"]},"metal_f0_urn":{"values":[]},"surface_albedo_urn":{"values":[]},"surface_anisotropy_urn":{"values":[]},"surface_cutout_urn":{"values":[]},"surface_normal_urn":{"values":[]},"surface_rotation_urn":{"values":[]},"surface_roughness_urn":{"values":[]},"swatch":{"values":["Swatch-Torus"]}},"uris":{"thumbnail":{"values":["Mats/PrismMetal/Presets/t_Prism-027.png"]}},"booleans":{"Hidden":{"values":[false]}},"integers":{"interior_model":{"values":[1]},"revision":{"values":[1]},"version":{"values":[1]}},"scalars":{"surface_anisotropy":{"units":"","values":[0]},"surface_rotation":{"units":"","values":[0]},"surface_roughness":{"units":"","values":[0.07746]}},"colors":{"metal_f0":{"values":[{"r":0.959822,"g":0.96226,"b":0.965052,"a":1}]},"surface_albedo":{"values":[{"r":1,"g":1,"b":1,"a":1}]}},"textures":{"surface_cutout":{},"surface_normal":{}},"choicelists":{"surface_ndf_type":{"values":[1]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["Prism-027"]}},"references":{}}}};
      this.initPaint(this.grill_SelectionSet, materialName, szPrism);
      this.setView(this.viewstate);
    },

    setFrameColor: function(rgb) {
      var materialName = "frame";
      var material = viewer.impl.matman()._materials[ `model:1|mat:${materialName}` ];
      if (material) {
        material.metal_f0.set(rgb);
        viewer.impl.invalidate(true);
        return;
      }
      var szPrism = {"0":{"tag":"Prism-027","definition":"PrismMetal","transparent":false,"keywords":["Metal","Aluminum","materials","metal"],"categories":["Metal/Aluminum","Default"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["PrismMetalSchema"]},"UIName":{"values":["Prism-027"]},"category":{"values":["Metal/Aluminum","Default"]},"description":{"values":["Aluminum - polished"]},"keyword":{"values":["Metal","Aluminum","materials","metal"]},"metal_f0_urn":{"values":[]},"surface_albedo_urn":{"values":[]},"surface_anisotropy_urn":{"values":[]},"surface_cutout_urn":{"values":[]},"surface_normal_urn":{"values":[]},"surface_rotation_urn":{"values":[]},"surface_roughness_urn":{"values":[]},"swatch":{"values":["Swatch-Torus"]}},"uris":{"thumbnail":{"values":["Mats/PrismMetal/Presets/t_Prism-027.png"]}},"booleans":{"Hidden":{"values":[false]}},"integers":{"interior_model":{"values":[1]},"revision":{"values":[1]},"version":{"values":[1]}},"scalars":{"surface_anisotropy":{"units":"","values":[0]},"surface_rotation":{"units":"","values":[0]},"surface_roughness":{"units":"","values":[0.07746]}},"colors":{"metal_f0":{"values":[{"r":0.959822,"g":0.96226,"b":0.965052,"a":1}]},"surface_albedo":{"values":[{"r":1,"g":1,"b":1,"a":1}]}},"textures":{"surface_cutout":{},"surface_normal":{}},"choicelists":{"surface_ndf_type":{"values":[1]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["Prism-027"]}},"references":{}}}};
      this.initPaint(this.frame_SelectionSet, materialName, szPrism);
      this.setView(this.viewstate);
    },

    setGlassColor: function(ior) {
      var materialName = "glass";
      this.show(this.glass_SelectionSet[0]);
      var material = viewer.impl.matman()._materials[ `model:1|mat:${materialName}` ];
      if (material) {
        material.transparent_ior = ior;
        viewer.impl.invalidate(true);
        return;
      }
      var szPrism = {"0":{"tag":"Prism-166","definition":"PrismTransparent","transparent":false,"keywords":["Glass","Color Density","materials","transparent"],"categories":["Glass/Color Density","Default"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["PrismTransparentSchema"]},"UIName":{"values":["Prism-166"]},"category":{"values":["Glass/Color Density","Default"]},"description":{"values":["Glass Light Color"]},"keyword":{"values":["Glass","Color Density","materials","transparent"]},"surface_albedo_urn":{"values":[]},"surface_anisotropy_urn":{"values":[]},"surface_cutout_urn":{"values":[]},"surface_normal_urn":{"values":[]},"surface_rotation_urn":{"values":[]},"surface_roughness_urn":{"values":[]},"swatch":{"values":["Swatch-Torus"]}},"uris":{"thumbnail":{"values":["Mats/PrismTransparent/Presets/t_Prism-166.png"]}},"booleans":{"Hidden":{"values":[false]}},"integers":{"interior_model":{"values":[3]},"revision":{"values":[1]},"version":{"values":[1]}},"scalars":{"surface_anisotropy":{"units":"","values":[0]},"surface_rotation":{"units":"","values":[0]},"surface_roughness":{"units":"","values":[0]},"transparent_distance":{"units":"mm","values":[100]},"transparent_ior":{"units":"","values":[0.01]}},"colors":{"surface_albedo":{"values":[{"r":1,"g":1,"b":1,"a":1}]},"transparent_color":{"values":[{"r":0.423583,"g":0.767376,"b":0.854306,"a":1}]}},"textures":{"surface_cutout":{},"surface_normal":{}},"choicelists":{"surface_ndf_type":{"values":[1]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["Prism-166"]}},"references":{}}}}
      this.initPaint(this.glass_SelectionSet, materialName, szPrism);
      this.setView(this.viewstate);
    },

    initFrags: function(materialName) {
      // this should be initialized all at once at the beginning
      const matmgr = viewer.impl.matman();
      const fl = viewer.model.getFragmentList();
      var material = matmgr._materials["model:1|mat:" + materialName];
      var fragIds = this.frags[materialName];
      fragIds.map(fragId => fl.setMaterial(fragId, material) );
    },

    initPaint: function(nodeNames, materialName, szPrism) {
      // prepare materials and fragments to be painted
      // input: nodeNames = material set names to search,  materialName = key, szPrism = json prism definition 

      // create wood frame material: Prism-093 Red Plastic
      let mat = {userassets : ["0"], materials : szPrism};
      viewer.impl.matman().convertOneMaterial(viewer.model, mat, materialName);

      // create a fast list of fragIds to change their material - see frags.
      this.frags[materialName] = [];
      const it = viewer.model.getData().instanceTree;
      nodeNames.map( nodeName => 
        viewer.model.search( nodeName, dbIds=> 
          dbIds.map( dbId => 
            it.enumNodeFragments(dbId, 
              fragId => this.frags[materialName].push(fragId), true)
      )));

      setTimeout(i=>this.initFrags(materialName),200 ); //search takes a while
    },

    show: function(nodeName) {
      this.hide(nodeName, true);
    },

    hide: function(nodeName, doShow) {
      viewer.model.search(nodeName, dbIds=> dbIds.map(dbId => {
        viewer.impl.visibilityManager.setNodeOff(dbId, !doShow)
      }));
    },

    onResize: function() {
      viewer.impl.resize(window.innerWidth-350, window.innerHeight);
    },

    onGeometryLoaded: function() {
      this.hide(this.glass_SelectionSet[0]); // hide glass to start with
      this.setGrill(0);
      this.setWoodColor("Jeld-Wen_Alder");

      // if user is idle, then flip between different interior/exterior camera views every 12 seconds.
      viewer.canvas.addEventListener('mousedown',(e => this.mousemoved=true) );
      viewer.canvas.addEventListener('mousewheel',(e => this.mousemoved=true) );
      setInterval(e=> {
        if (this.mousemoved) { this.mousemoved = false; return;  }
        this.viewstate++; this.viewstate%=this.cameraViewList.length; this.setView(this.viewstate);
      }, 6000 );
    },

    onSuccess: function() {
      this.onResize();
      viewer.container.style.cssText="";
      viewer.impl.renderer().setAOOptions(30.0,0.8);
      viewer.setGroundReflection(false);
      viewer.impl.toggleProgressive(false);
      viewer.impl.setOptimizeNavigation(true);
      this.setView(0);
      viewer.setBackgroundColor(180,220,255,255,255,255);
      viewer.impl.toggleShadows(true);
      viewer.impl.setShadowLightDirection(new THREE.Vector3(-30,120,-30));  //-30,130,-30));
      viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.onGeometryLoaded);
      window.addEventListener("resize", this.onResize);
    },

    initializeViewer: function(self) {
      // headless
      // avp.ENABLE_DEBUG=true
      //viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'), {});
      viewer = new Autodesk.Viewing.Viewer3D(document.getElementById('forgeViewer'), {});
      var options = {
          env: "Local",
          useADP: false,
          useConsolidation: false,
          urn2: "svf/AuroraDoor/Design.svf",
          urn2: "svf/cladAwningWindow/Design.svf",
          urn: "svf/Siteline_CladCasement30X48/Design.svf",
      }
      Autodesk.Viewing.Initializer( options, function() {
          viewer.start(options.urn, options, self.onSuccess);            
      });
    },
  }
})

