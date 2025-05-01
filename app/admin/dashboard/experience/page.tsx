'use client';

import AdminSidebar from '@/components/admin/sidebar';
import { checkAuth } from '@/lib/auth';
import axiosInstance from '@/lib/axios';
import { Experience } from '@/types/allTypes';
import { Briefcase, Calendar, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/admin');
        return;
      }

      try {
        const res = await axiosInstance.get('/experiences');
        setExperiences(res.data.data || []);
      } catch (error) {
        console.error('Error loading experience data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/experience/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      // In a real app, this would call an API to delete the experience
      setExperiences(experiences.filter(exp => exp._id !== id));
      // Then save the updated experiences to the JSON file
      alert('Experience deleted successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Work Experience
          </h1>
          <Link href="/admin/dashboard/experience/new">
            <button className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              <Plus className="mr-2 h-5 w-5" />
              Add New Experience
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          {experiences.map(experience => (
            <div
              key={experience._id}
              className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900 dark:text-green-300">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {experience.position}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {experience.company_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="mr-1 h-4 w-4" />
                      {experience.duration}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          experience._id && handleEdit(experience._id)
                        }
                        className="rounded p-1 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          experience._id && handleDelete(experience._id)
                        }
                        className="rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {experience.description}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Responsibilities:
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {experience.responsibilities.map(
                      (responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Technologies:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
