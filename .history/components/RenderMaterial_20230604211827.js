import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// export default function RenderMaterial() {
// 	return <></>
// }

const RenderMaterial = shaderMaterial(
	{
		uTime: 0,
		uTexture: null,
		positionTexture: null,
		uTex: null,
		uSetting: 0,
		uColor: null,
		uAlpha: 1.0,
	},
	`
    attribute vec2 ref;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform sampler2D positionTexture;
    uniform float uSetting;
    varying vec2 vref;
    void main(){
        vref = ref;
        vUv = uv;
        vec3 newpos = position;
        vec4 color = texture2D(uTexture, vUv);
        newpos.xy = color.xy;
        vec4 mvPosition = modelViewMatrix * vec4( newpos, 1.0 );
        if(uSetting == 1.0){
            gl_PointSize =  ( 4.0 / -mvPosition.z );
        }else{
            gl_PointSize = (2.0/-mvPosition.z);
        }
        // gl_Position = projectionMatrix * mvPosition;
        vec4 newPosition = texture2D(positionTexture, position.xy);
        gl_Position = projectionMatrix * viewMatrix * newPosition;



    }
    `,
	`
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform float uSetting;
    uniform vec3 uColor;
    uniform float uAlpha;
    void main(){
        // gl_FragColor.rgba = vec4(vref, 0.0, 1.0);
        // gl_FragColor.rgba = vec4(uColor, 0.5);
        // 0.00, 0.28, 0.53, 0.03
        // gl_FragColor = vec4(1., 0.37 ,0.19, .1);
        // gl_FragColor = vec4(0.32, 0.14 ,1.0, .1);
       if(uSetting == 1.0){
            gl_FragColor = vec4(0.23, 0.20, 0.57, 0.4 * uAlpha);
       }else{
            gl_FragColor = vec4(1.0, 1.0, 1.0, 0.3 * uAlpha);
       }

        // gl_FragColor.rgba = texture2D(uTex, vref);
    }
    `
)
extend({ RenderMaterial })
