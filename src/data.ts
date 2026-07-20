// ============================================================================
//  GRAPH DATA  —  edit this file to make the graph your own
// ============================================================================
//
//  This is the ONLY file you need to touch to change who's in the graph,
//  how they're connected, and where their pictures / links point.
//
//  Three things to know:
//    1. Every person is a NODE.        -> add them to `nodes`
//    2. Every relationship is a LINK.  -> add them to `links`
//    3. Every picture lives in /public -> named to match, or set `img`
//
//  See GRAPH_SETUP.md for a full walkthrough.
// ----------------------------------------------------------------------------

export interface GraphNode {
    /** Unique name/id for this person. Shown on hover. Required. */
    id: string;

    /**
     * A group number used to color nodes and size them.
     * Same number = same color. `gen: 1` nodes are drawn larger (the "hubs").
     */
    gen?: number;

    /**
     * Optional. Path to this person's picture, relative to /public.
     * If omitted, the graph looks for `/public/<id>.png` automatically
     * (e.g. id "julia" -> /public/julia.png).
     * Use this when your file name doesn't match the id, e.g. img: "/pics/jc.jpg".
     */
    img?: string;

    /**
     * Optional. If set, clicking this person's node opens this URL in a new tab.
     * Great for linking to someone's Instagram, LinkedIn, website, etc.
     */
    url?: string;
}

export interface GraphLink {
    /** id of the person the link starts from. */
    source: string;
    /** id of the person the link points to. */
    target: string;
    /** Optional label/group for the relationship. Links are colored by this. */
    family?: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

// ----------------------------------------------------------------------------
//  YOUR DATA
//
//  Below is the original "29" family graph, kept as a working example so the
//  app runs out of the box. Replace the people and links with your own.
//  Delete what you don't need — just keep the { nodes: [...], links: [...] }
//  shape.
// ----------------------------------------------------------------------------

export const data: GraphData = {
    nodes: [
        // gen 1 = the "family heads" (drawn larger)
        { gen: 1, id: "julia" },
        { gen: 1, id: "lee" },
        { gen: 1, id: "anish" },
        { gen: 1, id: "izzy" },
        { gen: 1, id: "ash" },
        { gen: 1, id: "emma" },

        // gen 2 = everyone else
        { gen: 2, id: "vivek" },
        { gen: 2, id: "li" },
        { gen: 2, id: "katherine" },
        { gen: 2, id: "max" },
        { gen: 2, id: "andy" },
        { gen: 2, id: "andrew" },
        { gen: 2, id: "charles" },
        { gen: 2, id: "anish jr" },
        { gen: 2, id: "pius" },
        { gen: 2, id: "violet" },
        { gen: 2, id: "vidur" },
        { gen: 2, id: "mithun" },
        { gen: 2, id: "ivory" },
        { gen: 2, id: "yusuf" },
        { gen: 2, id: "aiden" },
        { gen: 2, id: "jesse" },
        { gen: 2, id: "vincent" },
        { gen: 2, id: "yue" },
        { gen: 2, id: "kaitlyn" },
        { gen: 2, id: "justin" },
        { gen: 2, id: "edward" },
        { gen: 2, id: "steven" },
        { gen: 2, id: "amy" },
        { gen: 2, id: "faisal" },
        { gen: 2, id: "eddie" },
        { gen: 2, id: "keeler" },
        { gen: 2, id: "mik" }
    ],
    links: [
        // imps
        { source: "anish", target: "vivek", family: "imps" },
        { source: "anish", target: "li", family: "imps" },
        { source: "anish", target: "katherine", family: "imps" },
        { source: "anish", target: "max", family: "imps" },
        { source: "anish", target: "andy", family: "imps" },
        { source: "anish", target: "andrew", family: "imps" },
        { source: "anish", target: "charles", family: "imps" },
        { source: "anish", target: "anish jr", family: "imps" },
        { source: "anish", target: "pius", family: "imps" },
        { source: "anish", target: "violet", family: "imps" },
        { source: "anish", target: "vidur", family: "imps" },
        { source: "anish", target: "mithun", family: "imps" },
        { source: "anish", target: "ivory", family: "imps" },
        { source: "anish", target: "yusuf", family: "imps" },

        // izzy's icees
        { source: "izzy", target: "ivory", family: "icees" },
        { source: "izzy", target: "aiden", family: "icees" },
        { source: "izzy", target: "jesse", family: "icees" },
        { source: "izzy", target: "vincent", family: "icees" },
        { source: "izzy", target: "andrew", family: "icees" },
        { source: "izzy", target: "yue", family: "icees" },
        { source: "izzy", target: "kaitlyn", family: "icees" },
        { source: "izzy", target: "justin", family: "icees" },

        // ashlings
        { source: "ash", target: "aiden", family: "ashlings" },
        { source: "ash", target: "jesse", family: "ashlings" },
        { source: "ash", target: "edward", family: "ashlings" },
        { source: "ash", target: "steven", family: "ashlings" },
        { source: "ash", target: "max", family: "ashlings" },
        { source: "ash", target: "violet", family: "ashlings" },

        // lee's leafs
        { source: "lee", target: "li", family: "leafs" },
        { source: "lee", target: "katherine", family: "leafs" },
        { source: "lee", target: "amy", family: "leafs" },
        { source: "lee", target: "max", family: "leafs" },
        { source: "lee", target: "faisal", family: "leafs" },
        { source: "lee", target: "jesse", family: "leafs" },
        { source: "lee", target: "izzy", family: "leafs" },

        // julia's icecreams
        { source: "julia", target: "eddie", family: "icecream" },
        { source: "julia", target: "aiden", family: "icecream" },
        { source: "julia", target: "katherine", family: "icecream" },
        { source: "julia", target: "jesse", family: "icecream" },
        { source: "julia", target: "kaitlyn", family: "icecream" },
        { source: "julia", target: "keeler", family: "icecream" },
        { source: "julia", target: "mik", family: "icecream" },
        { source: "julia", target: "ivory", family: "icecream" },

        // mochis
        { source: "emma", target: "eddie", family: "mochis" },
        { source: "emma", target: "aiden", family: "mochis" },
        { source: "emma", target: "jesse", family: "mochis" },
    ]
};
