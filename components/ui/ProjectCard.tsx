'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  idx: number;
}

export function ProjectCard({ project, idx }: ProjectCardProps) {
  // Define bold text colors for different technologies
  const getTagColor = (technology: string) => {
    const colors: { [key: string]: string } = {
      'React': 'text-blue-600 font-semibold',
      'Next.js': 'text-gray-700 font-semibold',
      'TypeScript': 'text-blue-700 font-semibold',
      'Stripe': 'text-purple-600 font-semibold',
      'Figma': 'text-pink-600 font-semibold',
      'Storybook': 'text-orange-600 font-semibold',
      'Protopie': 'text-green-600 font-semibold',
      'User Research': 'text-indigo-600 font-semibold',
      'Prototyping': 'text-teal-600 font-semibold',
      'D3.js': 'text-yellow-600 font-semibold',
      'Node.js': 'text-green-600 font-semibold',
      'PostgreSQL': 'text-blue-600 font-semibold',
      'Illustrator': 'text-orange-600 font-semibold',
      'Photoshop': 'text-blue-600 font-semibold',
      'Brand Strategy': 'text-purple-600 font-semibold',
      'Brand': 'text-purple-600 font-semibold',
      'Print Design': 'text-pink-600 font-semibold',
      'Express': 'text-gray-700 font-semibold',
      'MongoDB': 'text-green-600 font-semibold',
      'Redis': 'text-red-600 font-semibold'
    }
    return colors[technology] || 'text-gray-700 font-semibold'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
        <Link href={project.href} className="block h-full">
          <div className="relative w-full h-48">
            <video
              src={project.video}
              loop
              muted
              playsInline
              controls={false}
              preload="metadata"
              className="rounded-t-lg object-cover w-full h-full"
              onMouseEnter={(e) => {
                const video = e.target as HTMLVideoElement;
                video.play().catch(() => {});
              }}
              onMouseLeave={(e) => {
                const video = e.target as HTMLVideoElement;
                video.pause();
                video.currentTime = 0;
              }}
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
              }}
            />
            {project.category && (
              <div className="absolute top-4 right-4">
                <span className="text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-muted-foreground">
                  {project.category}
                </span>
              </div>
            )}
          </div>
          
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xl">{project.title}</CardTitle>
            </div>
            <CardDescription className="text-base">
              {project.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {(project.tags || project.technologies)?.map((tag: string) => (
                <span
                  key={tag}
                  className={`text-xs bg-muted px-2 py-1 rounded-full ${getTagColor(tag)} transition-all group-hover:scale-105`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  )
}