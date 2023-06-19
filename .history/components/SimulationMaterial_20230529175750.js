import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Vector3 } from 'three'
const SimulationMaterial = shaderMaterial(
	{
		uPosition: null,
		uOriginalPosition: null,
		uMouse: new Vector3(-10, -10, 10),
	},
	`
    varying vec2 vUv; 
    void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 15.0;
    }
    `,
	`
    varying vec2 vUv;
    uniform sampler2D uPosition;
    uniform sampler2D uOriginalPosition;
    uniform vec3 uMouse;
    void main(){

        vec2 position = texture2D(uPosition, vUv).xy;
        vec2 original = texture2D(uOriginalPosition, vUv).xy;
        vec2 velocity = texture2D(uPosition, vUv).zw;
        velocity *= 0.99;

        float dist = length(original - position);
        vec2 force = original - uMouse.xy;
        vec2 target = original+ normalize(force)* 0.1;
        position.xy += (target - position.xy) * 0.1;


        // vec2 direction = normalize(original-position);
        // if(dist > 0.01){
        //     velocity += direction * 0.0001;
        // }

        // float mouseDistance = distance(position, uMouse.xy);
        // float maxDistance = 0.4;
        // if(mouseDistance < maxDistance){
        //     vec2 direction = normalize(position - uMouse.xy);
        //     velocity += direction * (1.0 - mouseDistance / maxDistance) * 0.01;
        // }

        // position.xy += velocity;

        gl_FragColor = vec4(position, velocity);        

    }
    `
)
extend({ SimulationMaterial })
