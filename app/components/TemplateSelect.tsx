"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTemplateId } from "../store/campaignSlice"; 
import { fetchTemplates, fetchTemplateInfo } from "../api/templateApi";

// Define the Template type based on the API response
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
  // Add other fields if needed
}

// Modal component to display popup
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
  const [showModal, setShowModal] = useState(false); // State to control the popup
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(
    null
  ); // Selected template info
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(0); // Current page index
  const [hasMore, setHasMore] = useState(true); // Flag to check if more templates exist
  const dispatch = useDispatch();
  const templatesPerPage = 50;

  // Function to fetch templates with offset
  const fetchTemplatesWithPagination = async (offset: number) => {
    setLoading(true); // Start loading
    try {
      const response = await fetchTemplates(offset); // Use the fetchTemplates function
      if (response.data.length < templatesPerPage) {
        setHasMore(false); // No more templates to fetch
      }

      // Append new templates while filtering out duplicates
      setTemplates((prevTemplates) => {
        const newTemplates = [...prevTemplates, ...response.data];

        // Create a new array with unique templateId values
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
    setLoading(false); // End loading
  };

  // Function to fetch template info
  const fetchTemplateInfoById = async (templateId: number) => {
    try {
      const response = await fetchTemplateInfo(templateId); // Use the fetchTemplateInfo function
      return response.data; // Return template info
    } catch (error) {
      console.error("Error fetching template info:", error);
    }
    return null; // Return null if error occurs
  };

  useEffect(() => {
    fetchTemplatesWithPagination(page * templatesPerPage); // Fetch templates when page changes
  }, [page]);

  const handleSelectTemplate = () => {
    setShowModal(true); // Open the modal with template list
  };

  const handleTemplateCheckboxChange = async (templateId: number) => {
    const templateInfo = await fetchTemplateInfoById(templateId);
    if (templateInfo) {
      setSelectedTemplate(templateInfo); // Set selected template details
      dispatch(setTemplateId(templateId)); // Set template ID in Redux
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Move to next page
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1); // Move to previous page
    }
  };

  return (
    <div>
      <button
        onClick={handleSelectTemplate}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Chọn Template
      </button>

      {/* Show Load More button if there are more templates */}
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

      {/* Display selected template details outside the modal */}
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

      {/* Modal to display list of templates */}
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

      {/* Loading state */}
      {loading && <p>Loading...</p>}
    </div>
  );
};
