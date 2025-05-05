'use client';

import AdminSidebar from '@/components/admin/sidebar';
import { checkAuth } from '@/lib/auth';
import axiosInstance from '@/lib/axios';
import { Skill, SkillCategory } from '@/types/allTypes';
import { Edit, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SkillsPage() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push('/admin');
        return;
      }

      try {
        const res = await axiosInstance.get('/skills');
        const data = res?.data;
        setSkillCategories(data || []);
      } catch (error: any) {
        console.error('Error loading skills data:', error);
        setSaveMessage(
          error.response?.data?.message ||
            'Failed to load skills. Please try again.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setSkillCategories([
        ...skillCategories,
        {
          category: newCategory.trim(),
          skills: [],
        },
      ]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this category and all its skills?',
      )
    ) {
      setSkillCategories(skillCategories.filter(cat => cat._id !== id));
    }
  };

  const handleAddSkill = (categoryId: string) => {
    setSkillCategories(
      skillCategories.map(cat => {
        if (cat._id === categoryId) {
          return {
            ...cat,
            skills: [...cat.skills, { name: 'New Skill', level: 50 }],
          };
        }
        return cat;
      }),
    );
  };

  const handleUpdateSkill = (
    categoryId: string,
    skillIndex: number,
    field: keyof Skill,
    value: string | number,
  ) => {
    setSkillCategories(
      skillCategories.map(cat => {
        if (cat._id === categoryId) {
          const updatedSkills = [...cat.skills];
          updatedSkills[skillIndex] = {
            ...updatedSkills[skillIndex],
            [field]: field === 'level' ? Number(value) : value,
          };
          return {
            ...cat,
            skills: updatedSkills,
          };
        }
        return cat;
      }),
    );
  };

  const handleDeleteSkill = (categoryId: string, skillIndex: number) => {
    setSkillCategories(
      skillCategories.map(cat => {
        if (cat._id === categoryId) {
          const updatedSkills = cat.skills.filter(
            (_, index) => index !== skillIndex,
          );
          return {
            ...cat,
            skills: updatedSkills,
          };
        }
        return cat;
      }),
    );
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveMessage('');

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        console.log(
          `Saving skills data (attempt ${attempt + 1}):`,
          skillCategories,
        );
        const res = await axiosInstance.patch('/skills', {
          skillCategories,
        });

        if (res.status === 200) {
          setSaveMessage('Skills saved successfully!');
          setEditMode(false);
          // Refresh categories from backend to ensure _id consistency
          const refreshRes = await axiosInstance.get('/skills');
          setSkillCategories(refreshRes.data || skillCategories);
          setTimeout(() => setSaveMessage(''), 3000);
          return;
        } else {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
      } catch (error: any) {
        console.error(`Error saving skills data (attempt ${attempt + 1}):`, {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
        attempt++;
        if (attempt > maxRetries) {
          let message = 'Failed to save skills. Please try again.';
          if (error.response) {
            message =
              error.response.data.message ||
              `Error: ${error.response.status} - Failed to save skills`;
          } else if (error.request) {
            message =
              'Error: No response from server. Please check if the server is running.';
          }
          setSaveMessage(message);
        }
        // Wait 1 second before retrying
        if (attempt <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    setIsSaving(false);
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Skills Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your skills and expertise
            </p>
          </div>
          <div className="flex space-x-4">
            {editMode ? (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-green-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit Skills
              </button>
            )}
          </div>
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

        {editMode && (
          <div className="mb-6 flex">
            <input
              type="text"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="New Category Name"
              className="w-full rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddCategory}
              className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="space-y-6">
          {skillCategories.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No skill categories found. Add a new category to get started.
            </p>
          ) : (
            skillCategories.map(category => (
              <div
                key={category._id || `new-${category.category}`}
                className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.category}
                    </h2>
                    {editMode && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            category._id && handleAddSkill(category._id)
                          }
                          className="rounded p-1 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            category._id && handleDeleteCategory(category._id)
                          }
                          className="rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {category.skills.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-400">
                        No skills in this category. Add a skill to get started.
                      </p>
                    ) : (
                      category.skills.map((skill, skillIndex) => (
                        <div
                          key={`skill-${skillIndex}`}
                          className="flex items-center justify-between"
                        >
                          {editMode ? (
                            <>
                              <div className="flex-1 pr-4">
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={e =>
                                    category._id &&
                                    handleUpdateSkill(
                                      category._id,
                                      skillIndex,
                                      'name',
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                              </div>
                              <div className="flex w-32 items-center">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={skill.level}
                                  onChange={e =>
                                    category._id &&
                                    handleUpdateSkill(
                                      category._id,
                                      skillIndex,
                                      'level',
                                      Number(e.target.value),
                                    )
                                  }
                                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                />
                                <span className="ml-2 w-8 text-sm text-gray-600 dark:text-gray-400">
                                  {skill.level}%
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  category._id &&
                                  handleDeleteSkill(category._id, skillIndex)
                                }
                                className="ml-2 rounded p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="text-gray-700 dark:text-gray-300">
                                {skill.name}
                              </span>
                              <div className="flex w-1/2 items-center">
                                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                  <div
                                    className="h-2 rounded-full bg-green-600 dark:bg-green-500"
                                    style={{ width: `${skill.level}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 w-8 text-sm text-gray-600 dark:text-gray-400">
                                  {skill.level}%
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
