import { Manifest } from "next/dist/lib/metadata/types/manifest-types";

const manifest = (): Manifest => {
    return {
        "name": "LunarChat",
        "short_name": "LunarChat",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#1E293B",
        "theme_color": "#1E293B",
        "orientation": "portrait-primary",
    };
}

export default manifest;
