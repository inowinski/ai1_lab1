interface AppState {
    currentStyle: string;
    styles: Record<string, string>;
}

const appState: AppState = {
    currentStyle: "page2.css",
    styles: {
        "Styl 1": "style/page1.css",
        "Styl 2": "style/page2.css",
        "Styl 3": "style/page3.css",
    },
};

function changeStyle(styleName: string): void {
    const head = document.head;
    const existingLink = document.querySelector("link[rel='stylesheet']");
    if (existingLink) {
        head.removeChild(existingLink);
    }

    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = appState.styles[styleName];
    head.appendChild(newLink);

    appState.currentStyle = appState.styles[styleName];
}

function createStyleSwitcher(): void {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const styleSwitcher = document.createElement("div");
    styleSwitcher.id = "style-switcher";
    styleSwitcher.style.marginTop = "10px";

    Object.keys(appState.styles).forEach(styleName => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = styleName;
        link.style.marginRight = "10px";
        link.addEventListener("click", () => changeStyle(styleName));
        styleSwitcher.appendChild(link);
    });

    footer.appendChild(styleSwitcher);
}

createStyleSwitcher();
