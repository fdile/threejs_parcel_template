import * as THREE from 'three';

import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import * as dat from 'dat-gui';

import { TimelineMax } from 'gsap';
let OrbitControls = require( 'three-orbit-controls' )( THREE );



export default class Sketch{

  constructor(){

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    this.renderer.setClearColor( 0xeeeeee, 1 );

    this.container = document.getElementById( 'container' );
    this.container.appendChild( this.renderer.domElement );
    
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.controls = new OrbitControls( this.camera );

    this.addObjects();
    this.resize();
    this.setupGUI();

    this.render();


  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(1,1)
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      vertexShader:vertex,
      fragmentShader:fragment,
      uniforms:{
        time: { type: "f", value: 0. },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },
      side:THREE.DoubleSide,
      //transparent:true
    });
	  this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  setupGUI() {
    this.settings = {
      progress: 0.,
    }
    this.gui = new dat.GUI();
    this.gui.add(this.settings, 'progress', 0., 1., 0, 0.01);
  }

  setupResize() {
    window.addEventListener('resize', this.resize);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width,this.height);


    // this.imageAspect = 853/1280; // IG size
    // let a1, a2;
    // if( this.height/this.width > this.imageAspect ){
    //   a1 = ( this.width/this.height ) * this.imageAspect;
    //   a2 = 1;
    // }else{
    //   a1 = 1;
    //   a2 = ( this.height/this.width ) * this.imageAspect;
    // }

    // this.material.uniforms.resolution.value.x = this.width;
    // this.material.uniforms.resolution.value.y = this.height;
    // this.material.uniforms.resolution.value.z = a1;
    // this.material.uniforms.resolution.value.w = a2;

    // // Fullscreen cover with quad
    // const dist = this.camera.position.z;
    // const height = 1;
    // this.camera.fov = 2 * ( 180/Math.PI ) * Math.atan( height/(2*dist) );

    // if(this.width/this.height>1) {
    //   this.mesh.scale.x = this.camera.aspect;
    // }else{
    //   this.mesh.scale.x = 1/this.camera.aspect;
    // }

    this.camera.updateProjectionMatrix();

  }

  render( time ) {

    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;

    this.material.uniforms.time.value = time;

    this.renderer.render( this.scene, this.camera );

    window.requestAnimationFrame( this.render.bind(this) );

  }
 


}

new Sketch();
