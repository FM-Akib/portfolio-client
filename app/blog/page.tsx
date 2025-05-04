import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axiosInstance from '@/lib/axios';
import { Blog } from '@/types/allTypes';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Software Engineer Portfolio',
  description:
    'Read my latest thoughts, tutorials, and insights on software development',
};

export default async function BlogPage() {
  const res = await axiosInstance.get('/blogs');
  const blogPosts = res.data.data as Blog[];
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24 pb-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-2xl">
            Thoughts, tutorials, and insights on software development, design,
            and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Card
              key={post._id}
              className="overflow-hidden flex flex-col h-full group"
            >
              <div className="overflow-hidden">
                <Image
                  src={post.cover_image_url || '/placeholder.svg'}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex gap-2 mb-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publication_date).toLocaleDateString()}
                  </span>
                  <Button variant="link" size="sm" asChild className="p-0">
                    <Link href={`/blog/${post._id}`}>Read More</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
