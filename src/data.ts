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
        { gen: 1, id: "John", img: "/john.png" },
        { gen: 1, id: "Katherine", img: "/katherine.png" },
        { gen: 1, id: "Aiden", img: "/aiden.png" },
        { gen: 1, id: "Amy", img: "/amy.png" },
        { gen: 1, id: "Bright", img: "/bright.png" },
        { gen: 1, id: "Jesse", img: "/jesse.png" },
        { gen: 1, id: "Kaitlyn", img: "/kaitlyn.png" },
        { gen: 1, id: "Max", img: "/max.png" },
        { gen: 1, id: "Rin", img: "/rin.png" },
        { gen: 1, id: "Violet", img: "/violet.png" },

        // gen 2 = everyone else
        { gen: 2, id: "Alex", img: "/alex.png" },
        { gen: 2, id: "Angela", img: "/angela.png" },
        { gen: 2, id: "Anissa", img: "/anissa.png" },
        { gen: 2, id: "Caf", img: "/caf.png" },
        { gen: 2, id: "Daniel", img: "/daniel.png" },
        { gen: 2, id: "Darren", img: "/darren.png" },
        { gen: 2, id: "Emily", img: "/emily.png" },
        { gen: 2, id: "Ernesto", img: "/ernesto.png" },
        { gen: 2, id: "Helen", img: "/helen.png" },
        { gen: 2, id: "Jacueline", img: "/jacueline.png" },
        { gen: 2, id: "Jessie", img: "/jessie.png" },
        { gen: 2, id: "Kai", img: "/kai.png" },
        { gen: 2, id: "Katelyn", img: "/katelyn.png" },
        { gen: 2, id: "Manraj", img: "/manraj.png" },
        { gen: 2, id: "Maverick", img: "/maverick.png" },
        { gen: 2, id: "Michaela", img: "/michaela.png" },
        { gen: 2, id: "Nikhil", img: "/nikhil.png" },
        { gen: 2, id: "Olivia", img: "/olivia.png" },
        { gen: 2, id: "Aiden Z", img: "/prospieaiden.png" },
        { gen: 2, id: "Peter", img: "/peter.png" },
        { gen: 2, id: "Sashvat", img: "/sashvat.png" },
        { gen: 2, id: "Sushrut", img: "/sushrut.png" },
        { gen: 2, id: "Vehd", img: "/vehd.png" },
        { gen: 2, id: "Vincent", img: "/vincent.png" },
        { gen: 2, id: "Xan", img: "/xan.png" },
        { gen: 2, id: "Yujie", img: "/yujie.png" },
        { gen: 2, id: "Zoe", img: "/zoe.png" },
    ],
    links: [
        // Tentype's Prismatic Pearls
        { source: "Max", target: "Anissa", family: "Prismatic Pearls" },
        { source: "Max", target: "Manraj", family: "Prismatic Pearls" },
        { source: "Max", target: "Nikhil", family: "Prismatic Pearls" },
        { source: "Max", target: "Sushrut", family: "Prismatic Pearls" },
        { source: "Max", target: "Peter", family: "Prismatic Pearls" },
        { source: "Max", target: "Vehd", family: "Prismatic Pearls" },
        { source: "Max", target: "Vincent", family: "Prismatic Pearls" },

        // Jessebeans!
        { source: "Jesse", target: "Anissa", family: "Jessebeans!" },
        { source: "Jesse", target: "Ernesto", family: "Jessebeans!" },
        { source: "Jesse", target: "Kai", family: "Jessebeans!" },
        { source: "Jesse", target: "Olivia", family: "Jessebeans!" },
        { source: "Jesse", target: "Vehd", family: "Jessebeans!" },

        // Rosebuds
        { source: "John", target: "Emily", family: "Rosebuds" },
        { source: "John", target: "Helen", family: "Rosebuds" },
        { source: "John", target: "Jessie", family: "Rosebuds" },
        { source: "John", target: "Manraj", family: "Rosebuds" },
        { source: "John", target: "Vehd", family: "Rosebuds" },
        { source: "John", target: "Zoe", family: "Rosebuds" },

        // Jellyfish
        { source: "Rin", target: "Angela", family: "Jellyfish" },
        { source: "Rin", target: "Jacueline", family: "Jellyfish" },
        { source: "Rin", target: "Kai", family: "Jellyfish" },
        { source: "Rin", target: "Katelyn", family: "Jellyfish" },
        { source: "Rin", target: "Vehd", family: "Jellyfish" },
        { source: "Rin", target: "Xan", family: "Jellyfish" },
        { source: "Rin", target: "Yujie", family: "Jellyfish" },

        // Katherine's Stars :)
        { source: "Katherine", target: "Anissa", family: "Katherine's Stars :)" },
        { source: "Katherine", target: "Maverick", family: "Katherine's Stars :)" },
        { source: "Katherine", target: "Michaela", family: "Katherine's Stars :)" },
        { source: "Katherine", target: "Nikhil", family: "Katherine's Stars :)" },
        { source: "Katherine", target: "Vehd", family: "Katherine's Stars :)" },

        // Turning's Violet Turnips
        { source: "Violet", target: "Aiden Z", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Alex", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Caf", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Darren", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Daniel", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Maverick", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Olivia", family: "Turning's Violet Turnips" },
        { source: "Violet", target: "Sashvat", family: "Turning's Violet Turnips" },
    ]
};
