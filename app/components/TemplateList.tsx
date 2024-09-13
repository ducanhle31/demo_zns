"use client";
import React, { useState, useEffect } from "react";

// Define the Template type based on the API response
interface Template {
  templateId: number;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
}

interface TemplateInfoResponse {
  data: TemplateInfo; // The actual data field containing template info
}

interface TemplateInfo {
  templateId: number;
  templateName: string;
  createdTime: number;
  status: string;
  templateQuality: string;
  previewUrl: string;
  // Add other fields if needed
}

export const TemplateList = () => {
  const [templates, setTemplates] = useState<Template[]>([]); // State for template list
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Current page index
  const [hasMore, setHasMore] = useState(true); // Flag to check if more templates exist
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateInfoResponse | null>(null); // Selected template info
  const templatesPerPage = 50;
  const apiUrl = "http://localhost:3001/api/v1/template"; // Backend endpoint for templates
  const templateInfoUrl = "http://localhost:3001/api/v1/template/info"; // Backend endpoint for template info

  const fetchData = async (offset: number) => {
    try {
      const response = await fetch(`${apiUrl}?offset=${offset}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend");
      }

      const data = await response.json();
      if (data.data.length < templatesPerPage) {
        setHasMore(false); // No more templates to fetch
      }

      // Append new templates while filtering out duplicates
      setTemplates((prevTemplates) => {
        const newTemplates = [...prevTemplates, ...data.data];

        // Create a new array with unique templateId values
        const uniqueTemplates = newTemplates.filter(
          (template, index, self) =>
            index ===
            self.findIndex((t) => t.templateId === template.templateId)
        );

        return uniqueTemplates;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setLoading(false);
    }
  };

  const fetchTemplateInfo = async (templateId: number) => {
    try {
      const response = await fetch(
        `${templateInfoUrl}?template_id=${templateId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch template info from the backend");
      }

      const data = await response.json();
      console.log(data);
      setSelectedTemplate(data); // Set the selected template details
    } catch (error) {
      console.error("Error fetching template info:", error);
    }
  };

  useEffect(() => {
    fetchData(page * templatesPerPage); // Fetch templates when page changes
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch the next set
  };

  const handleTemplateClick = (templateId: number) => {
    fetchTemplateInfo(templateId); // Fetch and show details for the selected template
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách Templates</h1>
      <p>Total unique templates: {templates.length}</p>
      <ul>
        {templates.map((template) => (
          <li key={template.templateId}>
            <p>Template ID: {template.templateId}</p>
            <p>Template Name: {template.templateName}</p>
            <button onClick={() => handleTemplateClick(template.templateId)}>
              View Details
            </button>
          </li>
        ))}
      </ul>

      {/* Show Load More button if there are more templates */}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}

      {/* Display selected template details */}
      {selectedTemplate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Template Details</h2>
          <p>
            <strong>Template ID:</strong> {selectedTemplate.data.templateId}
          </p>
          <p>
            <strong>Template Name:</strong> {selectedTemplate.data.templateName}
          </p>

          <iframe
            src={selectedTemplate.data.previewUrl}
            width="600"
            height="400"
            style={{ border: "none" }}
            title="Template Preview"
          ></iframe>
        </div>
      )}
    </div>
  );
};
