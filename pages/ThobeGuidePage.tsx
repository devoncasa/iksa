
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { StyledText } from '../components/StyledText';
import { ContentBlock } from '../components/ContentBlock';

const GuideTable: React.FC<{ caption: string; headersJSON: string; rowsJSON:string }> = ({ caption, headersJSON, rowsJSON }) => {
    try {
        const headers = JSON.parse(headersJSON);
        const rows = JSON.parse(rowsJSON);

        if (!Array.isArray(headers) || !Array.isArray(rows)) {
            throw new Error("Invalid JSON format for table data.");
        }

        return (
            <div className="my-10 not-prose">
                <h4 className="text-lg font-semibold text-warm-terracotta mb-4 italic text-center">{caption}</h4>
                <div className="overflow-x-auto bg-white/50 backdrop-blur-xl rounded-lg shadow-md border border-soft-sand">
                    <table className="min-w-full divide-y divide-soft-sand">
                        <thead className="bg-creamy-beige/30">
                            <tr>
                                {headers.map((header: string, index: number) => (
                                    <th key={index} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white/80 divide-y divide-soft-sand">
                            {rows.map((row: string[], rowIndex: number) => (
                                <tr key={rowIndex} className="transition-colors duration-150 odd:bg-creamy-beige/20">
                                    {row.map((cell: string, cellIndex: number) => (
                                        <td key={cellIndex} className={`px-6 py-4 whitespace-normal text-sm align-top ${cellIndex === 0 ? 'font-semibold text-deep-chocolate' : 'text-stone-700'}`}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to parse table JSON:", error);
        return <p className="text-red-500">Error rendering table.</p>;
    }
};

const useScrollSpy = (ids: string[], options?: IntersectionObserverInit): string => {
    const [activeId, setActiveId] = useState('');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const elements = ids.map(id => document.getElementById(id)).filter(el => el !== null) as HTMLElement[];
        if (elements.length === 0) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, options);

        elements.forEach(el => observer.current?.observe(el));

        // Set initial active ID
        if (!activeId) {
            setActiveId(elements[0].id);
        }

        return () => observer.current?.disconnect();
    }, [ids, options, activeId]);

    return activeId;
};

const ArticleCard: React.FC<{id: string; children: React.ReactNode;}> = ({ id, children }) => {
    return (
         <section id={id} className="scroll-mt-28 p-8 md:p-12 rounded-lg">
            <article className="prose prose-stone lg:prose-lg max-w-none 
                text-deep-chocolate 
                prose-headings:text-warm-terracotta prose-h1:text-muted-gold 
                prose-p:leading-relaxed 
                prose-strong:text-warm-terracotta 
                prose-a:text-warm-terracotta hover:prose-a:text-muted-gold prose-a:no-underline hover:prose-a:underline
                prose-h2:font-serif-display prose-h3:font-serif-display prose-h4:text-warm-terracotta/80">
                {children}
            </article>
        </section>
    );
};


export const ThobeGuidePage: React.FC = () => {
    const { translate } = useLanguage();
    
    const sections = [
        { id: 'colors', titleKey: 'color_title' },
        { id: 'artistry', titleKey: 'artistry_title' },
        { id: 'trends', titleKey: 'trends_title' },
        { id: 'conclusion', titleKey: 'conclusion_title' },
        { id: 'visuals', titleKey: 'visuals_title' }
    ];

    const sectionIds = sections.map(s => s.id);
    const activeId = useScrollSpy(sectionIds, { rootMargin: '-30% 0px -70% 0px' });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    return (
        <>
            <SEOMetadata
                titleKey="page_thobeGuide_title"
                descriptionKey="page_thobeGuide_description"
                keywordsKey="page_thobeGuide_keywords"
                pagePath="/thobe-guide"
            />

            <ContentBlock isHero>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-8 md:mb-10 text-center section-title-underline">
                    {translate('thobeGuide_full', 'title')}
                </h1>
                <div className="text-lg text-deep-chocolate leading-relaxed max-w-3xl mx-auto">
                    <StyledText text={translate('thobeGuide_full', 'intro')} />
                </div>
            </ContentBlock>

            <section className="relative w-full py-12 md:py-16">
                <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                        <aside className="hidden lg:block lg:col-span-3">
                            <nav className="sticky top-28 bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl shadow-lg p-6">
                                <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                                    {translate('thobeGuide_pageTitle')}
                                </h3>
                                <ul className="space-y-1">
                                    {sections.map(section => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                onClick={(e) => handleNavClick(e, section.id)}
                                                className={`block rounded-md py-2 px-3 transition-all duration-200 ease-in-out text-sm font-medium
                                                    ${activeId === section.id 
                                                        ? 'bg-creamy-beige text-warm-terracotta' 
                                                        : 'text-stone-600 hover:bg-stone-100/80 hover:text-stone-800'
                                                    }`
                                                }
                                                aria-current={activeId === section.id ? 'page' : undefined}
                                            >
                                                {translate('thobeGuide_full', section.titleKey)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside>

                        <main className="lg:col-span-9 space-y-16 bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-0">
                            <ArticleCard id="colors">
                                <h2>{translate('thobeGuide_full', 'color_title')}</h2>
                                <StyledText text={translate('thobeGuide_full', 'color_intro')} />
                                <h3>{translate('thobeGuide_full', 'color_palette_title')}</h3>
                                <h4>{translate('thobeGuide_full', 'color_white_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_white_content')} />
                                <h4>{translate('thobeGuide_full', 'color_black_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_black_content')} />
                                <img src="https://i.postimg.cc/5N18qDML/article-sundus-casa.webp" alt="Thobes in classic white and black colors" className="my-8 rounded-lg shadow-xl w-full h-auto object-cover not-prose"/>
                                <h3>{translate('thobeGuide_full', 'color_expressive_title')}</h3>
                                <h4>{translate('thobeGuide_full', 'color_brown_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_brown_content')} />
                                <h4>{translate('thobeGuide_full', 'color_grey_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_grey_content')} />
                                <h4>{translate('thobeGuide_full', 'color_blue_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_blue_content')} />
                                <h4>{translate('thobeGuide_full', 'color_green_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_green_content')} />
                                <h4>{translate('thobeGuide_full', 'color_red_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'color_red_content')} />
                                <GuideTable caption={translate('thobeGuide_full', 'color_table_caption')} headersJSON={translate('thobeGuide_full', 'color_table_headers')} rowsJSON={translate('thobeGuide_full', 'color_table_rows')} />
                            </ArticleCard>

                            <ArticleCard id="artistry">
                                <h2>{translate('thobeGuide_full', 'artistry_title')}</h2>
                                <StyledText text={translate('thobeGuide_full', 'artistry_intro')} />
                                <h3>{translate('thobeGuide_full', 'artistry_minimalism_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'artistry_minimalism_content')} />
                                <img src="https://i.postimg.cc/q7x2D1rD/article-regional-styles.webp" alt="Examples of minimalist and embroidered thobes" className="my-8 rounded-lg shadow-xl w-full h-auto object-cover not-prose"/>
                                <h3>{translate('thobeGuide_full', 'artistry_embroidery_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'artistry_embroidery_content')} />
                                <h4>{translate('thobeGuide_full', 'artistry_tatreez_title')}</h4>
                                <StyledText text={translate('thobeGuide_full', 'artistry_tatreez_content')} />
                                <GuideTable caption={translate('thobeGuide_full', 'artistry_table_caption')} headersJSON={translate('thobeGuide_full', 'artistry_table_headers')} rowsJSON={translate('thobeGuide_full', 'artistry_table_rows')} />
                            </ArticleCard>

                            <ArticleCard id="trends">
                                <h2>{translate('thobeGuide_full', 'trends_title')}</h2>
                                <StyledText text={translate('thobeGuide_full', 'trends_intro')} />
                                <h3>{translate('thobeGuide_full', 'trends_slimfit_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'trends_slimfit_content')} />
                                <h3>{translate('thobeGuide_full', 'trends_fabric_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'trends_fabric_content')} />
                                <img src="https://i.postimg.cc/9Q2w0h1G/article-fabric-science.webp" alt="Innovative fabric textures" className="my-8 rounded-lg shadow-xl w-full h-auto object-cover not-prose"/>
                                <h3>{translate('thobeGuide_full', 'trends_fusion_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'trends_fusion_content')} />
                                <h3>{translate('thobeGuide_full', 'trends_custom_title')}</h3>
                                <StyledText text={translate('thobeGuide_full', 'trends_custom_content')} />
                                <GuideTable caption={translate('thobeGuide_full', 'trends_table_caption')} headersJSON={translate('thobeGuide_full', 'trends_table_headers')} rowsJSON={translate('thobeGuide_full', 'trends_table_rows')} />
                            </ArticleCard>
                            
                            <ArticleCard id="conclusion">
                                <h2>{translate('thobeGuide_full', 'conclusion_title')}</h2>
                                <StyledText text={translate('thobeGuide_full', 'conclusion_content')} />
                            </ArticleCard>
                            
                            <ArticleCard id="visuals">
                                <h2>{translate('thobeGuide_full', 'visuals_title')}</h2>
                                <StyledText text={translate('thobeGuide_full', 'visuals_content')} />
                            </ArticleCard>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
};
