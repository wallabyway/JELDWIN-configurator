var viewer;
var markup;
var DBURL = 'http://localhost:3000';

//window.devicePixelRatio=4;

// Vue.js components
window.app = new Vue({
  el: "#app",
  data: {
    branches: ['master', 'dev'],
    model:1,
    grill:0,
    color:0,
    viewstate:0,
    modellist: [{title:"AuroraDoor", width:48}, {title:"AuroraDoor2", width:30}],
    grilllist: ["3x1","none","3x2","pin"],
    colorlist: [0xff0000,0x00ff00,0,0xffffff],
    viewlist: [
      {"viewport":{"name":"","eye":[816.3664100750727,1581.4397990817663,-1850.6848004385304],"target":[-523.6779981047528,-1022.6387623128437,1173.39486725056],"up":[-0.25060677179745633,0.7857197855552018,0.5655445734125164],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[-60.144152830513676,212.56597783004545,9.224665224552155],"distanceToOrbit":2461.839876050097,"aspectRatio":1.1028938906752412,"projection":"perspective","isOrthographic":false,"fieldOfView":31.007216101397866},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":30,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":false,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}}},
      {"viewport":{"name":"","eye":[758.6071137958699,-181.87660584704565,-372.4672910487796],"target":[-366.67739374739534,-492.1928728013003,779.5356793071743],"up":[-0.13221613309535377,0.9819357409698232,0.13535543858802299],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[0,0,0],"distanceToOrbit":747.7295840197216,"aspectRatio":1.1028938906752412,"projection":"perspective","isOrthographic":false,"fieldOfView":50.974857051035364},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":30,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":false,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}},"cutplanes":[]},
      {"viewport":{"name":"","eye":[332.11098215416376,89.3715674363259,-501.79170677051906],"target":[362.3953464160745,-861.4984913549079,834.0979745796533],"up":[0.013140375911034317,0.8147652195310618,0.5796421029940951],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[0,0,0],"distanceToOrbit":454.4215432379016,"aspectRatio":1.1028938906752412,"projection":"perspective","isOrthographic":false,"fieldOfView":50.974857051035364},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":30,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":false,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}}},
      {"viewport":{"name":"","eye":[-37.7700784919776,2345.4665165463866,-1025.8282444532483],"target":[-25.47770986571222,-1540.1618381958324,593.969024601256],"up":[0.007004340930119619,0.3847837979444308,0.922980155825462],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[-60.144152830513676,212.56597783004545,9.224665224552155],"distanceToOrbit":2366.8763477864195,"aspectRatio":1.1028938906752412,"projection":"perspective","isOrthographic":false,"fieldOfView":31.007216101397866},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":30,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":false,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}}},
      {"viewport":{"name":"","eye":[-138.066715944794,514.3241168745245,-10202.85251365043],"target":[-22.216833674062613,-296.2218987345466,5062.986693404377],"up":[0.00040234223666852194,0.9985934927762983,0.053017679179287625],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[-60.144152830513676,212.56597783004545,9.224665224552155],"distanceToOrbit":10214.009655565545,"aspectRatio":1.1028938906752412,"projection":"perspective","isOrthographic":false,"fieldOfView":8.736078700653755},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":30,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":false,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}}},      
    ],
  },

  computed: {
  },

  methods: {
    init: function() {
      //this.loadData();
      this.initializeViewer(this);
    },

    setModel(i) { this.model=i },
    setGrill(i) { this.grill=i },
    setColor(i) { this.color=i },

    setView(i) { this.viewstate=i; viewer.restoreState(this.viewlist[i]); },

    onResize: function() {
      viewer.impl.resize(window.innerWidth-350, window.innerHeight);
    },

    onSuccess: function() {
      this.onResize();
      viewer.container.style.cssText="";
      viewer.impl.renderer().setAOOptions(30.0,0.8);
      viewer.setGroundReflection(false);
      viewer.impl.setOptimizeNavigation(true);
      this.setView(0)
      viewer.setBackgroundColor(180,220,255,255,255,255);
      viewer.impl.toggleShadows(true);
      viewer.impl.setShadowLightDirection(new THREE.Vector3(30,30,10));
      initMaterial();
      setInterval(e=> {this.viewstate++; this.viewstate%=4; this.setView(this.viewstate);},20000 );
    },

    initializeViewer: function(self) {
      // headless
      // avp.ENABLE_DEBUG=true
      viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'), {});
      //viewer = new Autodesk.Viewing.Viewer3D(document.getElementById('forgeViewer'), {});
      var options = {
          env: "Local",
          useADP: false,
          useConsolidation: false,
          urn: "svf/AuroraDoor/Design.svf",
          urn2: "svf/cladAwningWindow/Design.svf"
      }
      Autodesk.Viewing.Initializer( options, function() {
          viewer.start(options.urn, options, self.onSuccess);            
      });
    },
  }
})