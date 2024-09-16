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

const Modal = ({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const TemplateSelect = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showModal, setShowModal] = useState(false); 
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

  const handleSelectTemplate = () => {
    setShowModal(true); 
  };

  const handleTemplateCheckboxChange = async (templateId: number) => {
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
      <button
        onClick={handleSelectTemplate}
        className="bg-blue-500 text-white p-2 rounded text-sm"
      >
        Chọn Template
      </button>

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

      {selectedTemplate && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Chi tiết mẫu ZNS</h2>
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

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h2 className="text-xl font-semibold">Select a Template</h2>
          <ul>
            {templates.map((template) => (
              <li key={template.templateId} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  onChange={() =>
                    handleTemplateCheckboxChange(template.templateId)
                  }
                  className="mr-2"
                />
                <p>{template.templateName}</p>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {loading && <p>Loading...</p>}
    </div>
  );
};
