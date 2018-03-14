var viewer;

window.devicePixelRatio=2;
//Vue.config.devtools = true;

// Vue.js components
window.app = new Vue({
  el: "#app",
  data: {
    mousemoved:false,
    interior:0,
    grill:0,
    color:0,
    viewstate:0,
    interiorList: [0,1],
    materials: [],
    paintIds: ["P007406-005","P007448-012", "P007550", "P003174", "P004351", "P004358", "P004396", "P004397", "P004354", "P004398"],
    grillList: ["W4500SDLwithShadowBar-32","none","W4500SDLwithShadowBar-31","W4500SDLwithShadowBar-30"],
    colorList: ["#F0E6C3","#0B3328","#2E180D","#6B2112","#00497F","#050304","#FFFFFF"],
    // get view state from console
    // v=viewer.getState();delete(v.seedURN);delete(v.objectSet);delete(v.renderOptions);delete(v.cutplanes);JSON.stringify(v)
    interiorViewList: [
      {"viewport":{"name":"","eye":[-23.934733209144355,1585.5847878552026,-1890.290668372906],"target":[-49.90142686214491,-1156.0759007627867,1479.6832621670778],"up":[-0.004862479443179459,0.7757223164351729,0.6310556584629555],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2475.674726785508,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018228309893}},
      {"viewport":{"name":"","eye":[976.5101249191881,1718.6634295254032,-2431.7969075209626],"target":[-422.8093501660627,-744.9101930444501,861.652941199498],"up":[-0.22174869042274326,0.8236734455193347,0.521909545268245],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.457095514863,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182578868873}},
      {"viewport":{"name":"","eye":[-651.0359863388851,1056.851887396308,-308.2953629206646],"target":[1400.1345281794809,-2522.750141561499,1053.046154797517],"up":[0.686510683790031,0.5666604666029178,0.45563032891973676],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":1278.607215448336,"aspectRatio":1.063305978898007,"projection":"perspective","isOrthographic":false,"fieldOfView":37.038556104489004}},
      {"viewport":{"name":"","eye":[-222.02474377459984,168.5862829262623,-703.3215295370461],"target":[-247.9914374276004,-2573.074405691725,2666.65240100294],"up":[-0.004862479443179459,0.7757223164351729,0.6310556584629555],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":659.5281550670321,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182650926582}},      {"viewport":{"name":"","eye":[-859.805917960608,1611.4059860741584,-2580.245480753893],"target":[223.69359468339576,-707.0994285191484,930.404507754411],"up":[0.1573833435418812,0.8456911231682037,0.5099382387800315],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.457095514863,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182654017124}},
    ],
    exteriorViewList: [
      {"viewport":{"name":"","eye":[1.3948304776675966,2150.613879984592,1661.0761419912435],"target":[41.78361101778469,-1306.2716410814744,-969.9717735477261],"up":[0.012213289989098961,0.6056849381739119,-0.795610828996757],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2702.5831651822923,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[-1531.7566468128357,382.44016289613535,2680.0192968885053],"target":[701.7056140748623,-236.092421840033,-994.6460843430514],"up":[0.07394720379451296,0.9898129928875554,-0.12166367642790113],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.988804954309,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[-1938.5312951199232,1992.7586277325167,1384.4103465483786],"target":[793.0653131778392,-862.3733082399949,-421.3314652668321],"up":[0.5482329645213153,0.7537221977848498,-0.3624133898996367],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.988804954309,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[3180.1270079242804,-83.77588186072347,738.0076454320756],"target":[-1057.3980556166152,-35.107938918820764,-218.60861012930286],"up":[0.010927384556393293,0.9999372515047872,0.002466844099013219],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3254.2835893729575,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[1177.110272600259,-400.3046677968286,510.4695545911544],"target":[-2774.5390951023783,-686.0844418242593,-1271.916231007433],"up":[-0.059963262173177226,0.9978341056975893,-0.02704634349118061],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":1239.6808440502773,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
    ],
  },

  computed: {
    grillpos: function(i){ return i*36}, 
    viewlist: function(){ return (!this.interior) ? this.interiorViewList:this.exteriorViewList},
  },

  methods: {
    init: function() {
      //this.loadData();
      this.initializeViewer(this);
    },

    setInterior(i) { this.interior=i; this.viewstate=0; this.setView(0) },
    setGrill(i) { this.grill=i; this.hide("W4500SDL"); this.hide( this.grillList[i], true); },
    setColor(i) { this.color=i; this.paint(this.color) },
    setView(i) { this.viewstate=i; viewer.restoreState(this.viewlist[i]); },

    paint: function(color) {
      const fl = viewer.model.getFragmentList();
      var material = this.materials["wood"];
      material.opaque_albedo.set(this.colorList[color]);
      this.frags.map(fragId => fl.setMaterial(fragId, material) );
      viewer.impl.invalidate(true);
    },

    initPaint: function(nodeNames) {
      // prepare materials and fragments to be painted
      const matmgr = viewer.impl.matman();
      const it = viewer.model.getData().instanceTree;
      const fl = viewer.model.getFragmentList();

      // create material: Prism-093 Red Plastic
      let mat = {userassets : ["0"]};
      mat.materials = {"0":{"tag":"Prism-093","definition":"PrismOpaque","transparent":false,"keywords":["Paint","Glossy","materials","opaque"],"categories":["Paint/Glossy","Default"],"properties":{"strings":{"AssetLibID":{"values":["BA5EE55E-9982-449B-9D66-9F036540E140"]},"BaseSchema":{"values":["PrismOpaqueSchema"]},"UIName":{"values":["Prism-093"]},"category":{"values":["Paint/Glossy","Default"]},"description":{"values":["Paint - enamel red glossy"]},"keyword":{"values":["Paint","Glossy","materials","opaque"]},"opaque_albedo_urn":{"values":[]},"opaque_f0_urn":{"values":[]},"opaque_luminance_modifier_urn":{"values":[]},"opaque_mfp_modifier_urn":{"values":[]},"surface_albedo_urn":{"values":[]},"surface_anisotropy_urn":{"values":[]},"surface_cutout_urn":{"values":[]},"surface_normal_urn":{"values":[]},"surface_rotation_urn":{"values":[]},"surface_roughness_urn":{"values":[]},"swatch":{"values":["Swatch-Torus"]}},"uris":{"thumbnail":{"values":["Mats/PrismOpaque/Presets/t_Prism-093.png"]}},"booleans":{"Hidden":{"values":[false]},"opaque_emission":{"values":[false]},"opaque_translucency":{"values":[false]}},"integers":{"interior_model":{"values":[0]},"revision":{"values":[1]},"version":{"values":[1]}},"scalars":{"opaque_f0":{"units":"","values":[0.06027]},"opaque_luminance":{"units":"","values":[0]},"opaque_mfp":{"units":"mm","values":[0.5]},"surface_anisotropy":{"units":"","values":[0]},"surface_rotation":{"units":"","values":[0]},"surface_roughness":{"units":"","values":[0.07746]}},"colors":{"opaque_albedo":{"values":[{"r":0.767376,"g":0.205984,"b":0.151704,"a":1}]},"opaque_luminance_modifier":{"values":[{"r":1,"g":1,"b":1,"a":1}]},"opaque_mfp_modifier":{"values":[{"r":1,"g":1,"b":1,"a":1}]},"surface_albedo":{"values":[{"r":1,"g":1,"b":1,"a":1}]}},"textures":{"surface_cutout":{},"surface_normal":{}},"choicelists":{"surface_ndf_type":{"values":[1]}},"uuids":{"ExchangeGUID":{"values":[""]},"VersionGUID":{"values":["Prism-093"]}},"references":{}}}}
      matmgr.convertOneMaterial(viewer.model, mat, "wood");
      this.materials["wood"] = matmgr._materials["model:1|mat:wood"]; //this is not needed in LMV v4.0, but shadows break

      // create a fast list of fragIds to change their material - see frags.
      this.frags = [];
      nodeNames.map( nodeName => 
        viewer.model.search( nodeName, dbIds=> 
          dbIds.map( dbId => 
            it.enumNodeFragments(dbId, 
              fragId => this.frags.push(fragId), true)
      )));
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
      this.hide("4500IGAssy"); // hide crazy glass
      this.setGrill(0);
      this.initPaint(this.paintIds);
      // flip between view states
      viewer.canvas.addEventListener('mousedown',(e => 
        this.mousemoved=true) );
      viewer.canvas.addEventListener('mousewheel',(e => 
        this.mousemoved=true) );
      /*setInterval(e=> {
        if (this.mousemoved) {
          this.mousemoved = false; 
          return;
        }
        this.viewstate++; this.viewstate%=this.viewlist.length; this.setView(this.viewstate);
      },8000 );*/
    },

    onSuccess: function() {
      this.onResize();
      viewer.container.style.cssText="";
      viewer.impl.renderer().setAOOptions(30.0,0.8);
      viewer.setGroundReflection(false);
      viewer.impl.setOptimizeNavigation(true);
      this.setView(0);
      viewer.setBackgroundColor(180,220,255,255,255,255);
      viewer.impl.toggleShadows(true);
      viewer.impl.setShadowLightDirection(new THREE.Vector3(-30,120,30));  //-30,130,-30));
      initMaterial();
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
          urn1: "svf/cladAwningWindow/Design.svf",
          urn: "svf/Siteline_CladCasement30X48/Design.svf",
      }
      Autodesk.Viewing.Initializer( options, function() {
          viewer.start(options.urn, options, self.onSuccess);            
      });
    },
  }
})

