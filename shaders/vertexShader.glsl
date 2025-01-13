#include simplexNoise4d.glsl
attribute vec3 tangent;

float getBlob(vec3 position) {
    vec3 wrappedPosition = position;
    wrappedPosition += simplexNoise4d(vec4(position * .1, 1.0 * 0.5)) * 0.1;
    return simplexNoise4d(vec4(wrappedPosition * 1., 1. * 0.2)) * 0.1;
}

void main() {
    vec3 bitangent = cross(tangent.xyz, normal);
    float shift = 0.001;
    vec3 pos1 = csm_Position + shift * bitangent;
    vec3 pos2 = csm_Position - shift * bitangent;

    float blob = getBlob(csm_Position);
    csm_Position += blob * normal;

    pos1 += getBlob(pos1) * normal;
    pos2 += getBlob(pos2) * normal;

    vec3 pos1Shadow = normalize(pos1 - csm_Position);
    vec3 pos2Shadow = normalize(pos2 - csm_Position);

    csm_Normal = -cross(pos1Shadow, pos2Shadow);



}