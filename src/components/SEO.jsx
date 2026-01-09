import React from 'react';


export default function SEO({
    title,
    description,
    name,
    type = 'website',
    image,
    url
}) {
    const siteTitle = import.meta.env.VITE_APP_TITLE || 'Portfolio Nicolas Edet';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Portfolio de photographie et direction artistique.";
    const metaDescription = description || defaultDescription;
    const metaImage = image || '/logo.png'; // Fallback to logo or default og image

    return (
        <>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={metaDescription} />
            <link rel="canonical" href={url || window.location.href} />

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={url || window.location.href} />

            {/* Twitter tags */}
            <meta name="twitter:creator" content={name || 'Arthur'} />
            <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </>
    );
}
