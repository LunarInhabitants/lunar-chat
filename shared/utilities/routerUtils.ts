export function routerPush(url: string) {
    // Below currently triggers a reload, which is glitchy and lame
    // const router = useRouter();
    // router.push(url);
    // Falling back to native for now.
    history.pushState({}, "", url);
}