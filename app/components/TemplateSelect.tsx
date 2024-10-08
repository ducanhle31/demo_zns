"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTemplateId } from "../../lib/redux/campaign.Slice";
import { fetchTemplates, fetchTemplateInfo } from "../api/templateApi";

interface Template {
  templateId: string;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
}
interface TemplateInfo {
  templateId: string;
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
  const [page] = useState(0);
  const [, setHasMore] = useState(true);
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

  const fetchTemplateInfoById = async (templateId: string) => {
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

  const handleSelectTemplate = async (templateId: string) => {
    const templateInfo = await fetchTemplateInfoById(templateId);
    if (templateInfo) {
      setSelectedTemplate(templateInfo);
      dispatch(setTemplateId(templateId));
    }
  };

  return (
    <div>
      <div className="mb-2 space-x-4">
        <label htmlFor="campaign-type" className="font-bold">
          Chọn TEMPLATE:
        </label>
        <select
          onChange={(e) => handleSelectTemplate(e.target.value)}
          className="border border-gray-300 p-2 rounded  "
          aria-label="Select a template"
        >
          <option value="">Chọn Template</option>
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
            className="border-none"
            title="Template Preview"
          ></iframe>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};
