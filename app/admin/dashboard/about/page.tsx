'use client';

import type React from 'react';

import AdminSidebar from '@/components/admin/sidebar';
import { checkAuth } from '@/lib/auth';
import axiosInstance from '@/lib/axios';
import { AboutData } from '@/types/allTypes';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/admin');
        return;
      }

      try {
        // const data = await import('@/lib/data/about.json');
        const response = await axiosInstance.get('/about');
        const data = response.data.data;
        setAboutData(data);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      // Handle nested properties (for social links)
      const [parent, child] = name.split('.');
      setAboutData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof AboutData] as Record<string, unknown>),
            [child]: value,
          },
        };
      });
    } else {
      // Handle top-level properties
      setAboutData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    console.log('Submitting about data:', aboutData);
    try {
      const response = await axiosInstance.post('/about', aboutData);
      console.log('Server response:', response.data);
      setSaveMessage('About information saved successfully!');
    } catch (error: any) {
      console.error('Error saving about data:', error);
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSaving(true)
  //   setSaveMessage("")

  //   try {
  //     // In a real app, this would be an API call to save the data
  //     // For this demo, we'll just simulate a save
  //     await new Promise((resolve) => setTimeout(resolve, 1000))

  //     // Show success message
  //     setSaveMessage("About information saved successfully!")

  //     // In a real app, you would update the JSON file here
  //     console.log("Saving about data:", aboutData)
  //   } catch (error) {
  //     console.error("Error saving about data:", error)
  //     setSaveMessage("Error saving data. Please try again.")
  //   } finally {
  //     setIsSaving(false)
  //   }
  // }

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
            About Information
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit your personal information and social links
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

        {aboutData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={aboutData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={aboutData.title}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={aboutData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Long Description
                </label>
                <textarea
                  name="longDescription"
                  value={aboutData.longDescription}
                  onChange={handleChange}
                  rows={6}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={aboutData.image}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resume URL
                  </label>
                  <input
                    type="text"
                    name="resumeUrl"
                    value={aboutData.resumeUrl}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Social Links
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={aboutData.socialLinks.github}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={aboutData.socialLinks.linkedin}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="socialLinks.facebook"
                    value={aboutData.socialLinks.facebook}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="socialLinks.instagram"
                    value={aboutData.socialLinks.instagram}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CodeForces
                  </label>
                  <input
                    type="url"
                    name="socialLinks.codeforces"
                    value={aboutData.socialLinks.codeforces}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CodeChef
                  </label>
                  <input
                    type="url"
                    name="socialLinks.codechef"
                    value={aboutData.socialLinks.codechef}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    YouTube
                  </label>
                  <input
                    type="url"
                    name="socialLinks.youtube"
                    value={aboutData.socialLinks.youtube}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
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
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
