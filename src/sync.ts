export function getLinks(target: Document): Promise<HTMLLinkElement[]> {
    return new Promise<HTMLLinkElement[]>(resolve => {
        const links = target.getElementsByTagName('link');
        resolve([].slice.call(links));
    });
}

export function insertLink(target: Document,
                           link: HTMLLinkElement,
                           timeout: number = 500): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const linkElement: HTMLLinkElement = target.createElement('link');
            linkElement.rel = link.rel;
            linkElement.href = link.href;
            linkElement.as = link.as;

            const safetyTimer = setTimeout(() => reject('failed to insert link before time-out'), timeout);

            linkElement.addEventListener('load', function load() {
                linkElement.removeEventListener('load', load);
                clearTimeout(safetyTimer);
                resolve();
            });

            target.head.appendChild(linkElement);
        } catch (e) {
            reject(`unexpected error inserting style elements, error=${e.message}`);
        }
    });
}

export async function insertLinks(target: Document, links: HTMLLinkElement[]): Promise<void> {
    await Promise.all(links.map(link => insertLink(target, link)));
}
