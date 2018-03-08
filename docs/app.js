var viewer;
var markup;
var DBURL = 'http://localhost:3000';

window.devicePixelRatio=3;

// Vue.js components
window.app = new Vue({
  el: "#app",
  data: {
    homeViewState: {"seedURN":"svf/AuroraDoor/Design.svf","objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[923.956192394088,-161.47604876734601,2642.3544244910104],"target":[0.0000010000002248489182,0.0051879882811078915,-8.06173062324524],"up":[0.01890679169974891,0.9983491804042026,0.05423511052703323],"worldUpVector":[0,1,2.560839e-16],"pivotPoint":[9.999999974752427e-7,0.00518798828125,-8.06173062324524],"distanceToOrbit":2811.490179376451,"aspectRatio":1.8694481830417227,"projection":"perspective","isOrthographic":false,"fieldOfView":50.9748570702278},"renderOptions":{"environment":"Warm Light","ambientOcclusion":{"enabled":true,"radius":70,"intensity":0.8},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":true,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":false}},"cutplanes":[]},
    selected: [ ],
    styleIcon: {
      backgroundPosition:0,
      borderRadius:"20px"
    },
    name: '',
    item: {
      title:"myTitle",
      description:"myDesc",
      markupId:0,
      type:0,
    },
    itemIsVisible:false,
    Items: [ { title: 'loading...', url:"" }]
  },
  methods: {
    init: function() {
      //this.loadData();
      this.initializeViewer(this);
    },

    onSuccess: function() {
      viewer.impl.resize(window.innerWidth-350, window.innerHeight);
      viewer.restoreState(this.homeViewState, null, false); 
      viewer.impl.renderer().setAOOptions(30.0,0.8);
      viewer.setGroundReflection(false);
      viewer.impl.toggleShadows(true);
      viewer.impl.setShadowLightDirection(new THREE.Vector3(-30,30,10));
      viewer.setBackgroundColor(180,220,255,255,255,255);
    },

    initializeViewer: function(self) {
       avp.ENABLE_DEBUG=true

      // headless
      viewer = new Autodesk.Viewing.Viewer3D(document.getElementById('forgeViewer'), {});
      //viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'), {});
      var options = {
          env: "Local",
          useADP: false,
          useConsolidation: true,
          urn: "svf/AuroraDoor/Design.svf"
      }
      Autodesk.Viewing.Initializer( options, function() {
          viewer.start(options.urn, options, self.onSuccess);            
      });
    },

    removeItem: function (item) {
      this.Items = this.Items.filter( i => {return i.MarkupID != item});
      //@@@ To Do:  Add api to remove item from MySQL
    },

    cardClick: function (item) {
      //load measurement
      if (!item.completed) {
        viewer.dispatchEvent(new CustomEvent('removeData', {'detail': item.MarkupID}));
      } else {
        // mark all items with ID from database.  This will be used to remove items and set hover effects
        Object.keys(item.json).map(i=>item.json[i].id=item.MarkupID);
        viewer.dispatchEvent(new CustomEvent('newData', {'detail': item.json}));
      }
    },

    loadData: function() {
      //uncomment this out at activate live MySQL data
//      fetch(`${DBURL}/allMarkup?approvalid=1`).then(r => r.json()).then( data=> {
      fetch(`dummydata.json`).then(r => r.json()).then( data=> {
          this.Items = data;
          this.Items.forEach(i => i.json=JSON.parse(i.json));
      })
    }
  },

  computed: {
    totalSqrFeet() {
      return this.Items
        .filter(i => i.completed )
        .reduce((acc, val) => acc + val.sqrfoot, 0 );
    },
  }
})