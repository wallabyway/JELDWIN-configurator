var viewer;
var markup;
var DBURL = 'http://localhost:3000';

window.devicePixelRatio=3;

// Vue.js components
window.app = new Vue({
  el: "#app",
  data: {
    branches: ['master', 'dev'],
    model:1,
    grill:0,
    color:0,
    viewstate:0,
    interior:0,
    interiorlist: [{title:"AuroraDoor", width:48}, {title:"AuroraDoor2", width:30}],
    grilllist: ["none","W4500SDLwithShadowBar-30","W4500SDLwithShadowBar-31","W4500SDLwithShadowBar-32"],
    colorlist: [0xff0000,0x00ff00,0,0xffffff],
    interiorViewList: [
      {"viewport":{"name":"","eye":[664.998896757992,974.4528583677848,-2853.5124661039504],"target":[-341.6835041212396,-470.0068899700484,1118.165828068862],"up":[-0.08169020310061798,0.9431084788113914,0.3222935120529782],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.9888049543088,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[976.5101249191881,1718.6634295254032,-2431.7969075209626],"target":[-422.8093501660627,-744.9101930444501,861.652941199498],"up":[-0.22174869042274326,0.8236734455193347,0.521909545268245],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.457095514863,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182578868873}},
      {"viewport":{"name":"","eye":[-23.934733209144355,1585.5847878552026,-1890.290668372906],"target":[-49.90142686214491,-1156.0759007627867,1479.6832621670778],"up":[-0.004862479443179459,0.7757223164351729,0.6310556584629555],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2475.674726785508,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018228309893}},
      {"viewport":{"name":"","eye":[-222.02474377459984,168.5862829262623,-703.3215295370461],"target":[-247.9914374276004,-2573.074405691725,2666.65240100294],"up":[-0.004862479443179459,0.7757223164351729,0.6310556584629555],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":659.5281550670321,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182650926582}},      {"viewport":{"name":"","eye":[-859.805917960608,1611.4059860741584,-2580.245480753893],"target":[223.69359468339576,-707.0994285191484,930.404507754411],"up":[0.1573833435418812,0.8456911231682037,0.5099382387800315],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.457095514863,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182654017124}},
      {"viewport":{"name":"","eye":[-1366.6406035366042,275.0394746708141,-2745.903649513959],"target":[483.61675507406335,-188.6582152409079,1157.3813839532672],"up":[0.0457181594048278,0.99428763733196,0.09644658702859152],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.4570955148633,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182654017124}},
      {"viewport":{"name":"","eye":[-5.878521481998469,201.84753452359269,-3040.1208875812345],"target":[-83.54806386681821,-158.05577397739137,1288.6825202818918],"up":[-0.0014861603805041029,0.9965626604263528,0.08282907201746037],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3038.4570955148633,"aspectRatio":0.9984076433121019,"projection":"perspective","isOrthographic":false,"fieldOfView":30.090182654017124}},
    ],
    exteriorViewList: [
      {"viewport":{"name":"","eye":[-1531.7566468128357,382.44016289613535,2680.0192968885053],"target":[701.7056140748623,-236.092421840033,-994.6460843430514],"up":[0.07394720379451296,0.9898129928875554,-0.12166367642790113],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.988804954309,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[-1938.5312951199232,1992.7586277325167,1384.4103465483786],"target":[793.0653131778392,-862.3733082399949,-421.3314652668321],"up":[0.5482329645213153,0.7537221977848498,-0.3624133898996367],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3097.988804954309,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[1.3948304776675966,2150.613879984592,1661.0761419912435],"target":[41.78361101778469,-1306.2716410814744,-969.9717735477261],"up":[0.012213289989098961,0.6056849381739119,-0.795610828996757],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":2702.5831651822923,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[3180.1270079242804,-83.77588186072347,738.0076454320756],"target":[-1057.3980556166152,-35.107938918820764,-218.60861012930286],"up":[0.010927384556393293,0.9999372515047872,0.002466844099013219],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":3254.2835893729575,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
      {"viewport":{"name":"","eye":[1177.110272600259,-400.3046677968286,510.4695545911544],"target":[-2774.5390951023783,-686.0844418242593,-1271.916231007433],"up":[-0.059963262173177226,0.9978341056975893,-0.02704634349118061],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[7.673578235792149,5.988379140379028,16.402849631116737],"distanceToOrbit":1239.6808440502773,"aspectRatio":0.8256624825662483,"projection":"perspective","isOrthographic":false,"fieldOfView":30.09018266215554}},
    ],
  },

  computed: {
    viewlist: function(){ return (!this.interior) ? this.interiorViewList:this.exteriorViewList},
  },

  methods: {
    init: function() {
      //this.loadData();
      this.initializeViewer(this);
    },

    setInterior(i) { this.interior=i; this.viewstate=0; this.setView(0) },
    setGrill(i) { this.grill=i; this.hide("W4500SDL"); this.hide( this.grilllist[i], true); },
    setColor(i) { this.color=i },

    setView(i) { this.viewstate=i; viewer.restoreState(this.viewlist[i]); },

    onResize: function() {
      viewer.impl.resize(window.innerWidth-350, window.innerHeight);
    },

    hide: function(nodeName, doShow) {
      viewer.model.search(nodeName, dbIds=> dbIds.map(dbId => {
        viewer.impl.visibilityManager.setNodeOff(dbId, !doShow)
      }));
    },

    onGeometryLoaded: function() {
      this.hide("4500IGAssy"); // hide crazy glass
      this.setGrill(0);
      setInterval(e=> {this.viewstate++; this.viewstate%=this.viewlist.length; this.setView(this.viewstate);},4000 );
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
      viewer.impl.setShadowLightDirection(new THREE.Vector3(-10,30,-30));
      initMaterial();
      viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.onGeometryLoaded);
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