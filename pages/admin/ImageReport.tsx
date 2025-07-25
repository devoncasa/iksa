
import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useImageRegistry } from '../../hooks/useImageRegistry';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../../components/Button';
import { ManagedImage } from '../../components/ManagedImage';
import { RegisteredImage } from '../../types';

type SortKey = 'location' | 'filename';
type SortDirection = 'asc' | 'desc';

export const ImageReport: React.FC = () => {
  const { images, updateImageRecommendations } = useImageRegistry();
  const { logout } = useAdminAuth();
  const { translate } = useLanguage();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'location', direction: 'asc' });

  const sortedImages = useMemo(() => {
    let sortableImages: RegisteredImage[] = [...images];
    sortableImages.sort((a, b) => {
      const aVal = sortConfig.key === 'filename' ? a.src : `${a.pageName} - ${a.sectionTitle}`;
      const bVal = sortConfig.key === 'filename' ? b.src : `${b.pageName} - ${b.sectionTitle}`;
      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableImages;
  }, [images, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const generateRecommendations = async (imageId: string, context: string) => {
    setLoadingStates(prev => ({ ...prev, [imageId]: true }));
    setErrorStates(prev => ({ ...prev, [imageId]: '' }));

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Based on the following context for an image on a luxury textile website, suggest an image subject and an artistic style.
      Context: "${context}"
      
      Provide a response in JSON format with two keys: "subject" and "style".
      - "subject": A concise description of what the image should depict.
      - "style": A description of the visual style (e.g., lighting, mood, composition).
      
      Example response:
      {
        "subject": "A master tailor inspecting the fine weave of a white Japanese textile roll under natural light.",
        "style": "Cinematic, soft focus with shallow depth of field. Warm, natural light highlighting fabric texture. Minimalist and clean composition."
      }
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              style: { type: Type.STRING }
            },
            required: ["subject", "style"]
          }
        }
      });

      const jsonString = response.text.trim();
      const result = JSON.parse(jsonString);

      if (result.subject && result.style) {
        updateImageRecommendations(imageId, { subject: result.subject, style: result.style });
      } else {
        throw new Error("Invalid response format from API.");
      }

    } catch (error) {
      console.error("Error generating recommendations:", error);
      setErrorStates(prev => ({ ...prev, [imageId]: translate('admin_recommendations_error') }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [imageId]: false }));
    }
  };

  const exportData = (format: 'json' | 'csv') => {
    if (images.length === 0) return;
    const data = sortedImages.map(img => ({
        filename: img.src.substring(img.src.lastIndexOf('/') + 1),
        source_url: img.src,
        page: img.pageName,
        section: img.sectionTitle,
        alt_text: img.alt,
        aspect_ratio: img.aspectRatio,
        recommended_subject: img.recommendations?.subject || '',
        recommended_style: img.recommendations?.style || '',
    }));

    if (format === 'json') {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "iksa_image_report.json";
      link.click();
    } else { // CSV
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
        const csvString = `data:text/csv;charset=utf-8,${encodeURIComponent([header, ...rows].join('\n'))}`;
        const link = document.createElement("a");
        link.href = csvString;
        link.download = "iksa_image_report.csv";
        link.click();
    }
  };


  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">{translate('admin_imageReport_title')}</h1>
            <p className="text-stone-600 mt-1">{translate('admin_imageReport_description')}</p>
          </div>
          <Button onClick={logout} variant="secondary">{translate('admin_logout')}</Button>
        </div>
        
        <div className="flex justify-end gap-4 mb-4">
            <Button onClick={() => exportData('json')} variant='outline'>{translate('admin_exportJSON')}</Button>
            <Button onClick={() => exportData('csv')} variant='outline'>{translate('admin_exportCSV')}</Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full text-sm text-left text-stone-600">
            <thead className="text-xs text-stone-700 uppercase bg-stone-50">
              <tr>
                <th scope="col" className="p-4">{translate('admin_table_header_thumbnail')}</th>
                <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('filename')}>
                    {translate('admin_table_header_filename')}
                    {getSortIndicator('filename')}
                </th>
                <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('location')}>
                    {translate('admin_table_header_location')}
                    {getSortIndicator('location')}
                </th>
                <th scope="col" className="p-4">{translate('admin_table_header_dimensions')}</th>
                <th scope="col" className="p-4">{translate('admin_table_header_recommendations')}</th>
                <th scope="col" className="p-4">{translate('admin_table_header_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedImages.map(image => (
                <tr key={image.id} className="bg-white border-b hover:bg-stone-50">
                  <td className="p-4">
                    <div className="w-24 h-24">
                        <ManagedImage 
                            src={image.src} 
                            alt={image.alt}
                            pageName={image.pageName}
                            sectionTitle={image.sectionTitle}
                            className="w-full h-full object-cover rounded" 
                        />
                    </div>
                  </td>
                  <td className="p-4 font-mono align-top">
                    <input 
                        type="text" 
                        value={image.src.substring(image.src.lastIndexOf('/') + 1)} 
                        readOnly 
                        className="w-full bg-transparent border-0 p-0 text-xs"
                        onFocus={(e) => e.target.select()}
                    />
                    <a href={image.src} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View Original</a>
                  </td>
                  <td className="p-4 align-top">
                    <div className="font-semibold">{image.pageName}</div>
                    <div className="text-stone-500">{image.sectionTitle}</div>
                    <div className="text-xs italic mt-1 text-stone-400">Alt: "{image.alt}"</div>
                  </td>
                  <td className="p-4 font-mono text-xs align-top">{image.aspectRatio}</td>
                  <td className="p-4 max-w-xs align-top">
                    {image.recommendations ? (
                      <div className="text-xs space-y-2">
                        <div><strong className="text-stone-800">Subject:</strong> {image.recommendations.subject}</div>
                        <div><strong className="text-stone-800">Style:</strong> {image.recommendations.style}</div>
                      </div>
                    ) : (
                      <div className="text-xs text-stone-400">No suggestions yet.</div>
                    )}
                    {errorStates[image.id] && <div className="text-xs text-red-500 mt-2">{errorStates[image.id]}</div>}
                  </td>
                  <td className="p-4 align-top">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => generateRecommendations(image.id, `Page: ${image.pageName}, Section: ${image.sectionTitle}, Description: ${image.alt}`)}
                      disabled={loadingStates[image.id]}
                    >
                      {loadingStates[image.id] ? translate('admin_getting_recommendations') : translate('admin_get_recommendations')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
