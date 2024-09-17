"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTemplateId } from "../redux/campaign.Slice"; 
import { fetchTemplates, fetchTemplateInfo } from "../api/templateApi";

interface Template {
  templateId: number;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
}
interface TemplateInfo {
  templateId: number;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
  previewUrl: string;
}

export const TemplateSelect = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(
    null
  );
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 
  const dispatch = useDispatch();
  const templatesPerPage = 50;

  const fetchTemplatesWithPagination = async (offset: number) => {
    setLoading(true); 
    try {
      const response = await fetchTemplates(offset); 
      if (response.data.length < templatesPerPage) {
        setHasMore(false); 
      }

      setTemplates((prevTemplates) => {
        const newTemplates = [...prevTemplates, ...response.data];

        const uniqueTemplates = newTemplates.filter(
          (template, index, self) =>
            index ===
            self.findIndex((t) => t.templateId === template.templateId)
        );

        return uniqueTemplates;
      });
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
    setLoading(false); 
  };

  const fetchTemplateInfoById = async (templateId: number) => {
    try {
      const response = await fetchTemplateInfo(templateId); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching template info:", error);
    }
    return null; 
  };

  useEffect(() => {
    fetchTemplatesWithPagination(page * templatesPerPage); 
  }, [page]);

  const handleSelectTemplate = async (templateId: number) => {
    const templateInfo = await fetchTemplateInfoById(templateId);
    if (templateInfo) {
      setSelectedTemplate(templateInfo); 
      dispatch(setTemplateId(templateId)); 
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1); 
    }
  };

  return (
    <div>
      <h1 className=" font-bold text-black text-md text-center mb-2"> Gửi theo UID </h1>
      <div>
        <select
          onChange={(e) => handleSelectTemplate(Number(e.target.value))}
          className="bg-blue-500 text-white p-2 rounded text-sm w-full"
        >
          <option value="">Lựa chọn Template</option>
          {templates.map((template) => (
            <option key={template.templateId} value={template.templateId}>
              {template.templateName}
            </option>
          ))}
        </select>
      </div>

      {selectedTemplate && (
        <div className="mt-4">
          <p>
            <strong>Template ID:</strong> {selectedTemplate.templateId}
          </p>
          <p>
            <strong>Template Name:</strong> {selectedTemplate.templateName}
          </p>
          <iframe
            src={selectedTemplate.previewUrl}
            width="400"
            height="400"
            style={{ border: "none" }}
            title="Template Preview"
          ></iframe>
        </div>
      )}

      {hasMore && (
        <div className="pagination mt-4">
          <button onClick={handlePreviousPage} disabled={page === 0 || loading}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={loading}>
            Next
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};
