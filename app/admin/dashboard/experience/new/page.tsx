'use client';

import type React from 'react';

import AdminSidebar from '@/components/admin/sidebar';
import { checkAuth } from '@/lib/auth';
import axiosInstance from '@/lib/axios';
import { Experience } from '@/types/allTypes';
import { Loader2, Plus, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewExperiencePage() {
  const [experienceData, setExperienceData] = useState<Experience>({
    _id: '',
    company_name: '',
    position: '',
    duration: '',
    description: '',
    responsibilities: [],
    technologies: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/admin');
        return;
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExperienceData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setExperienceData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()],
      }));
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setExperienceData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !experienceData.technologies.includes(newTechnology.trim())
    ) {
      setExperienceData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (tech: string) => {
    setExperienceData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    console.log('Submitting experience data:', experienceData);

    try {
      const response = await axiosInstance.post('/experiences', experienceData);
      setSaveMessage('Experience saved successfully!');

      if (response.status === 200) {
        // Redirect to the experience list page after successful save
        router.push('/admin/dashboard/experience');
      }
    } catch (error: any) {
      console.error('Error saving experience data:', error);
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new work experience to your portfolio
          </p>
        </div>

        {saveMessage && (
          <div
            className={`mb-6 rounded-md p-4 ${
              saveMessage.includes('Error')
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}
          >
            {saveMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Experience Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={experienceData.company_name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={experienceData.position}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={experienceData.duration}
                onChange={handleChange}
                placeholder="e.g., Jan 2020 - Present"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={experienceData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                A brief overview of your role and responsibilities
              </p>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Responsibilities
              </label>
              <div className="mb-2 space-y-2">
                {experienceData.responsibilities.map(
                  (responsibility, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700"
                    >
                      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                        {responsibility}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index)}
                        className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ),
                )}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newResponsibility}
                  onChange={e => setNewResponsibility(e.target.value)}
                  className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Add a responsibility"
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addResponsibility();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {experienceData.technologies.map(tech => (
                  <div
                    key={tech}
                    className="flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800 dark:text-green-100"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 rounded-full p-1 hover:bg-green-200 dark:hover:bg-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={e => setNewTechnology(e.target.value)}
                  className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Add a technology"
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add technologies or skills used in this role
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/experience')}
              className="rounded-md border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Experience
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
