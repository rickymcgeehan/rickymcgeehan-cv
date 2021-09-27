export default async function sitemap(req, res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://${req.headers.host}</loc>
            </url>
        </urlset>
    `);
    res.end();

    return { props: {} };
}
