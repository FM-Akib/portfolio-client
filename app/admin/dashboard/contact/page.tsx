'use client';

import AdminSidebar from '@/components/admin/sidebar';
import { checkAuth } from '@/lib/auth';
import axiosInstance from '@/lib/axios';
import { ContactDetails } from '@/types/allTypes';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactDetails>({
    email: '',
    phone: '',
    address: '',
    linkedin_url: '',
    github_url: '',
    twitter_url: '',
    available_for: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [newAvailability, setNewAvailability] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/admin');
        return;
      }

      try {
        const res = await axiosInstance.get(
          '/contacts/68178dc2c8a6959569effb35',
        );
        const data = res.data.data || {}; // Default to empty object if null
        console.log('Fetched contact data:', data);

        setContactData({
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || '',
          twitter_url: data.twitter_url || '',
          available_for: Array.isArray(data.available_for)
            ? data.available_for
            : [],
        });
      } catch (error) {
        console.error('Error loading contact data:', error);
        setSaveMessage('Failed to load contact data.');
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
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const addAvailability = () => {
    if (newAvailability.trim()) {
      setContactData(prev => ({
        ...prev,
        available_for: [...(prev.available_for || []), newAvailability.trim()],
      }));
      setNewAvailability('');
    }
  };

  const removeAvailability = (index: number) => {
    setContactData(prev => ({
      ...prev,
      available_for: prev.available_for.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.email || !contactData.phone || !contactData.address) {
      setSaveMessage('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
      setSaveMessage('Please enter a valid email address.');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      console.log('Updating contact data:', contactData);
      const res = await axiosInstance.put(
        '/contacts/68178dc2c8a6959569effb35',
        contactData,
      );
      setSaveMessage('Contact information updated successfully!');
    } catch (error: any) {
      console.error('Error updating contact data:', error);
      console.error('Server response:', error.response?.data);
      setSaveMessage(
        'Error updating data: ' +
          (error.response?.data?.message ||
            'Invalid request. Please check the data and try again.'),
      );
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
            Contact Information
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit your contact details and social links
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
          {/* Contact Fields */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Contact Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={contactData.address}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Social Links
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={contactData.linkedin_url}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub
                </label>
                <input
                  type="url"
                  name="github_url"
                  value={contactData.github_url}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Twitter
                </label>
                <input
                  type="url"
                  name="twitter_url"
                  value={contactData.twitter_url}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Available For
            </h2>

            <div className="mb-4 space-y-2">
              {contactData.available_for.length > 0 ? (
                contactData.available_for.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700"
                  >
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAvailability(index)}
                      className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No availability items added.
                </p>
              )}
            </div>

            <div className="flex">
              <input
                type="text"
                value={newAvailability}
                onChange={e => setNewAvailability(e.target.value)}
                className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Freelance projects"
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAvailability();
                  }
                }}
              />
              <button
                type="button"
                onClick={addAvailability}
                className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Add types of work or opportunities you're available for
            </p>
          </div>

          {/* Save Button */}
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
      </main>
    </div>
  );
}
