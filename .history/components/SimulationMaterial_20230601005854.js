import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Vector3 } from 'three'
const SimulationMaterial = shaderMaterial(
	{
		uCurrentPosition: null,
		uOriginalPosition: null,
		uOriginalPosition1: null,
		uTime: 0.0,
		uMouse: new Vector3(0, 0, 0),
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
	uniform float uProgress;
	uniform sampler2D uCurrentPosition;
	uniform sampler2D uOriginalPosition;
	uniform sampler2D uOriginalPosition1;
    uniform float uTime;
	uniform vec3 uMouse;

    vec3 mod289(vec3 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x)
    {
      return mod289(((x*34.0)+10.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    vec3 fade(vec3 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }
    
    // Classic Perlin noise
    float cnoise(vec3 P)
    {
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
    
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
    
      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    
      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
    
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
    
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }
    
    // Classic Perlin noise, periodic variant
    float pnoise(vec3 P, vec3 rep)
    {
      vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
      vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
    
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
    
      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    
      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
    
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
    
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }
    
    
    mat3 rotation3dY(float angle) {
      float s = sin(angle);
      float c = cos(angle);
    
      return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
      );
    }
    
    vec2 permute(vec2 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float noise(vec2 p){
        vec4 b = floor(p.xyxy + vec4(0.0,0.0,1.0,1.0));
        vec4 x0 = b.xyxy - vec2(floor(b.x), floor(b.y));
        vec4 x1 = x0 - vec2(1.0, 1.0);
        b = permute(permute(b.xy)+b.zw);
    
        vec4 i = mix(vec4(b.z, b.w, b.z, b.w), vec4(b.x, b.y, b.x, b.y), lessThan(vec4(x0.x, x0.z, x1.x, x1.z), vec4(x0.y, x0.w, x1.y, x1.w)));
        vec4 x = mix(vec4(x0.xz, x1.xz), vec4(x0.yw, x1.yw), step(i.yzxw, i.xyzw));
    
        return dot(i.xyzw, vec4(1.0 - dot(x.xyzw, x.xyzw)));
    }
    
    vec3 curl_noise(vec3 p)
    {
    
      // return curlNoise(p);
      const float step = 0.01;
      float ddx = cnoise(p+vec3(step, 0.0, 0.0)) - cnoise(p-vec3(step, 0.0, 0.0));
      float ddy = cnoise(p+vec3(0.0, step, 0.0)) - cnoise(p-vec3(0.0, step, 0.0));
      float ddz = cnoise(p+vec3(0.0, 0.0, step)) - cnoise(p-vec3(0.0, 0.0, step));
    
      const float divisor = 1.0 / ( 2.0 * step );
      return ( vec3(ddy - ddz, ddz - ddx, ddx - ddy) * divisor );
    }
    
    vec3 fbm_vec3(vec3 p, float frequency, float offset)
    {
      return vec3(
        cnoise((p+vec3(offset))*frequency),
        cnoise((p+vec3(offset+20.0))*frequency),
        cnoise((p+vec3(offset-30.0))*frequency)
      );
    }
    // vec3 getOffset(vec3 p ){
    //     float twistScale = cnoise(pos)*0.5 + 0.5;
    //     vec3 tempos = rotation3dY(uTime*(0.1 + 0.5 * twistScale) + length(pos.xz)) * p;
    //     vec3 offset = fbm_vec3( tempos + pos , 0.1, 0.);
    //     return offset;
    // }
    vec2 worldToScreen(vec3 worldPosition, mat4 projectionMatrix, mat4 viewMatrix, vec2 screenSize) {
        // Transform to clip space
        vec4 clipSpacePosition = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
    
        // Perform perspective divide and move origin to top left
        vec2 ndc = (clipSpacePosition.xyz / clipSpacePosition.w).xy;
        vec2 screenSpace = ((ndc + 1.0) / 2.0) * screenSize;
    
        return screenSpace;
    }
    // mat3 rotationMatrix = mat3(
    //     cos(angle), 0.0, sin(angle),
    //     0.0, 1.0, 0.0,
    //     -sin(angle), 0.0, cos(angle)
    // );
    // mat2 rotationMatrix = mat2(
    //     cos(angle), -sin(angle),
    //     sin(angle), cos(angle)
    // );
	void main() {
	    // // vec2 position = texture2D( uCurrentPosition, vUv ).xy;
	    // // vec2 original = texture2D( uOriginalPosition, vUv ).xy;
	    // // vec2 original1 = texture2D( uOriginalPosition1, vUv ).xy;

	    // // vec2 finalOriginal = mix(original, original1, uProgress);

        // // vec2 velocity = texture2D(uCurrentPosition, vUv).zw;
        // // velocity *= 0.99;

        // // vec2 direction = normalize(finalOriginal - position);
        // // float dist = length(finalOriginal - position);
        // // if(dist > 0.01){
        // //     velocity += direction;
        // // }


        // // // float mouseDistance = distance(position, uMouse.xy);
        // // // float maxDistance = 0.1;
        // // // if(mouseDistance < maxDistance){
        // // //     vec2 direction = normalize(position - uMouse.xy);
        // // //     velocity += direction * (1.0 - mouseDistance / maxDistance) * 0.0001;
        // // // }


	    // // // vec2 force = finalOriginal - uMouse.xy;

	    // // // float len = length(force);
	    // // // float forceFactor = 1./max(1.,len*50.);

	    // // // vec2 positionToGo = finalOriginal + normalize(force)*forceFactor *0.1;

	    // // // position.xy += (positionToGo - position.xy) * 0.05;
        // // position.xy += velocity;

	    // // // position.xy += normalize(position.xy );

	    // // gl_FragColor = vec4( position, 0,1.0);
        // vec2 position = texture2D( uCurrentPosition, vUv ).xy;
        // vec2 original = texture2D( uOriginalPosition, vUv ).xy;
        // vec2 original1 = texture2D( uOriginalPosition1, vUv ).xy;
    
        // // vec2 velocity = texture2D( uCurrentPosition, vUv ).zw;
    
        // // vec2 finalOriginal = mix(original, original1, uProgress);
        // // // vec2 centeredFinalOriginal = finalOriginal - vec2(0.5);
        // // vec2 rotatedOriginal = rotationMatrix(uTime) * finalOriginal;
        // // // vec2 rotatedFinalOriginal = rotatedOriginal + vec2(0.5);

        // vec2 velocity = texture2D( uCurrentPosition, vUv ).zw;

        // vec2 finalOriginal = mix(original, original1, uProgress);
        // // vec2 rotatedFinalOriginal = rotationMatrix(uTime) * finalOriginal;
        
        // // vec2 rotatedPosition = rotationMatrix(uTime) * position;
        
        // velocity *= 0.95;
        

    
    
        // // particle attraction to shape force
        // vec2 direction = normalize( finalOriginal - position );
        // float dist = length( finalOriginal - position );
        // if( dist > 0.01 ) {
        //     velocity += direction  * 0.0001;
        // }
        
    
    
        // // vec2 newPos = worldToScreen(vec3(position, 0.0))
        // float mouseDistance = distance( position, uMouse.xy );
        // float maxDistance = 0.05;
        // if( mouseDistance < maxDistance ) {
        //     vec2 direction = normalize( position - uMouse.xy );
        //     velocity += direction * ( 1.0 - mouseDistance / maxDistance ) * 0.0005;
        // }
    
    
    
    
        // position.xy += velocity;
    
        
        // gl_FragColor = vec4( position, velocity);
        float angle = uTime * 0.1;
        mat2 rotationMatrix = mat2(
            cos(angle), -sin(angle),
            sin(angle), cos(angle)
        );
        vec2 position = texture2D(uOriginalPosition, vUv).xy;
        vec2 currentPosition = texture2D(uCurrentPosition, vUv).xy; 
        
        vec2 newPosition = rotationMatrix * position;
        vec2 finalPosition = mix(currentPosition, newPosition, 0.1);

        gl_FragColor = vec4(finalPosition, 0.0, 1.0);
	}
	`
)
extend({ SimulationMaterial })