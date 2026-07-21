import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import { data, familyColors, type GraphNode, type GraphLink } from './data';
import "./style.css";

// ----------------------------------------------------------------------------
//  To change WHO is in the graph and how they connect, edit src/data.ts.
//  This file only handles rendering / camera / interaction.
// ----------------------------------------------------------------------------

const textureLoader = new THREE.TextureLoader();

const createCircularMask = () => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
};

const createStarfield = () => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });

    const starsVertices = [];
    const numStars = 2000;

    for (let i = 0; i < numStars; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    return new THREE.Points(starsGeometry, starsMaterial);
};

const circularMask = createCircularMask();

// Resolve a node's picture: use `img` if given, else /public/<id>.png
const imageFor = (node: GraphNode) =>
    node.img ?? `/${node.id}.png`;

// The graph library passes a looser node/link type to its callbacks; our
// data is always GraphNode/GraphLink-shaped, so we narrow it here.
const asNode = (node: object) => node as GraphNode;
const asLink = (link: object) => link as GraphLink;

// Automatic fallback colors, one per unique `family` value that isn't
// listed in `familyColors` (data.ts).
const autoFamilyColor = (() => {
    const palette = [
        '#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4',
        '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080',
    ];
    const assigned = new Map<string, string>();
    return (family: string) => {
        if (!assigned.has(family)) {
            assigned.set(family, palette[assigned.size % palette.length]);
        }
        return assigned.get(family)!;
    };
})();

// Pick a link's color, in order of priority:
//   1. `color` set directly on that link in data.ts
//   2. `familyColors[link.family]` set in data.ts
//   3. an automatic color shared by all links with the same `family`
const colorForLink = (rawLink: object) => {
    const link = asLink(rawLink);
    if (link.color) return link.color;
    if (!link.family) return '#ffffff';
    return familyColors[link.family] ?? autoFamilyColor(link.family);
};

const graph = new ForceGraph3D(document.querySelector('body')!)
    .graphData(data)
    .nodeLabel("id")
    .nodeAutoColorBy("gen")
    .linkColor(colorForLink)
    .linkLabel("family")
    .linkWidth(1)
    .linkOpacity(0.5)
    .linkResolution(6)
    // Clicking a node with a `url` in data.ts opens that link in a new tab.
    .onNodeClick((node: object) => {
        const { url } = asNode(node);
        if (url) {
            window.open(url, "_blank", "noopener");
        }
    })
    .nodeThreeObject((rawNode: object) => {
        const node = asNode(rawNode);
        const texture = textureLoader.load(imageFor(node));
        const material = new THREE.SpriteMaterial({
            map: texture,
            alphaMap: circularMask,

            // get rid of black border behind mask
            // interestingly, this occludes links and not other sprites
            depthTest: false,
        });

        const sprite = new THREE.Sprite(material);
        const scale = node.gen === 1 ? 18 : 12;
        sprite.scale.set(scale, scale, 1);
        sprite.renderOrder = 100000; // render over links

        return sprite;
    })
    .nodeThreeObjectExtend(true); // enables custom objects

const starfield = createStarfield();
graph.scene().add(starfield);

const initialDistance = 300;
graph.cameraPosition({ x: initialDistance, y: 0, z: 0 });

let angle = 0;
const rotationSpeed = 0.001;

let isUserInteracting = false;
// ReturnType<typeof setTimeout> works whether the DOM (number) or Node
// (Timeout) type definitions are in scope.
let interactionTimeout: ReturnType<typeof setTimeout>;

const getCurrentAngleFromCamera = () => {
    const cameraPos = graph.cameraPosition();
    return Math.atan2(cameraPos.z, cameraPos.x);
}

const getCurrentDistanceFromCamera = () => {
    const cameraPos = graph.cameraPosition();
    // distance from center (ignoring Y for horizontal rotation)
    return Math.sqrt(cameraPos.x * cameraPos.x + cameraPos.z * cameraPos.z);
};

// detect user interaction + resume after 2.5 seconds of no interaction
const graphElement = graph.graphData().nodes.length > 0 ? graph : null;
if (graphElement) {
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.addEventListener('mousedown', () => {
            isUserInteracting = true;
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isUserInteracting = false;
                angle = getCurrentAngleFromCamera();
            }, 2500);
        });

        canvas.addEventListener('wheel', () => {
            isUserInteracting = true;
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                isUserInteracting = false;
                angle = getCurrentAngleFromCamera();
            }, 2500);
        });
    }
}

const animate = () => {
    if (!isUserInteracting) {
        angle += rotationSpeed;

        // default to initialDistance if camera is at center
        const distance = getCurrentDistanceFromCamera() || initialDistance;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;

        const currentY = graph.cameraPosition().y;
        graph.cameraPosition({ x, y: currentY, z });
    }

    requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
    graph.width(window.innerWidth).height(window.innerHeight);
})
