#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_bgColor;
uniform vec3 u_colors[10];
uniform vec2 u_positions[10];
uniform int u_numberPoints;
uniform float u_noiseRatio;
uniform float u_warpRatio;
uniform float u_warpSize;
uniform vec2 u_mouse;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}



void main() {

  	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y=1.-st.y;
    vec3 noise=vec3(rand(vec2(st.x*5.+u_time,st.y*5.-u_time)));
    
    float warp=snoise(vec3(st.xy*u_warpSize,u_time))*u_warpRatio;
    st+=warp;
    //warp=snoise(vec3(st.xy*2.,u_time))*m/2.;
    //st+=warp;

    
    float pointGradient=0.;
    vec3 colorGradient=vec3(0.);
    float totalLight=1.;
    for(int i=0;i<10;i++){
      if(i<u_numberPoints){
        vec3 color=u_colors[i];
        vec2 pointPos=u_positions[i];
        //if(i==0){
        //  pointPos=vec2(u_mouse.x/u_resolution.x,1.-u_mouse.y/u_resolution.y);
        //}
        float dist=1.-distance(st,pointPos)*1.1;
        pointGradient+=clamp(dist,0.,1.);
        colorGradient+=color*clamp(dist,0.,1.);
        totalLight*=(1.-dist)*(1.-dist);
      }
    }
    
    totalLight=smoothstep(0.,1.,clamp(1.-totalLight,0.,1.));
    colorGradient=(colorGradient/pointGradient)*totalLight;

    vec3 bgGradient=(1.-totalLight)*u_bgColor;
    vec3 total=mix(clamp(colorGradient,0.,1.)+bgGradient,noise,u_noiseRatio);
    gl_FragColor = vec4(vec3(total),1.);
    
    /*
    
    float pointGradient=0.;
    float colorGradient=0.;
    vec3 totalCol=vec3(0.);
    float totalLight=1.;
    for(int i=0;i<10;i++){
      if(i<u_numberPoints){
        vec3 color=rgb_to_hcy(u_colors[i]);
        vec2 pointPos=u_positions[i];
        //if(i==0){
        //  pointPos=vec2(u_mouse.x/u_resolution.x,1.-u_mouse.y/u_resolution.y);
        //}
        float dist=1.-distance(st,pointPos)*1.5;
        pointGradient+=clamp(dist,0.,1.);
        totalCol+=color*clamp(dist,0.,1.);
        //totalLig=max(totalLig,dist);
        totalLight*=(1.-dist);
      }
    }
    totalLight=smoothstep(0.,1.,clamp(1.-totalLight,0.,1.));
    vec3 colorMix=hcy_to_rgb(vec3(totalCol/pointGradient))*totalLight;
    vec3 bgGradient=vec3(1.-totalLight)*u_bgColor;
    vec3 total=colorMix+bgGradient;
    
  	gl_FragColor = vec4(vec3(total),1.);*/
}