'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileText, Search, Lightbulb, Users, Clock, CheckCircle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

type Doc = {
	icon: any
	title: string
	description: string
	category: string
	details?: string[]
}

const docs: Doc[] = [
		{
			icon: BookOpen,
			title: 'Project Documentation',
			description:
				'Comprehensive documentation for all projects, including setup guides, API references, and deployment instructions.',
			category: 'Development',
			details: [
				'Setup & environment configuration (local and production)',
				'API reference with examples and response shapes',
				'Deployment checklist and rollback steps',
			],
		},
		{
			icon: FileText,
			title: 'Design Systems',
			description:
				'Complete design systems with component libraries, style guides, and brand guidelines.',
			category: 'Design',
			details: [
				'Component usage examples and tokens',
				'Accessibility guidelines and contrast checks',
				'Typography, spacing and color tokens',
			],
		},
		{
			icon: Search,
			title: 'Best Practices',
			description:
				'Curated collection of industry best practices, coding standards, and optimization techniques.',
			category: 'Guidelines',
			details: [
				'Code style, linting and commit message conventions',
				'Performance tips (lazy loading, caching, image optimization)',
				'Testing strategy and recommended coverage targets',
			],
		},
		{
			icon: Lightbulb,
			title: 'Tutorials & Guides',
			description: 'Step-by-step tutorials and guides for common development and design tasks.',
			category: 'Learning',
			details: [
				'Getting started guides for new projects',
				'How-to articles for common integrations (Auth, Payments)',
				'Video walkthroughs and example repositories',
			],
		},
		{
			icon: Users,
			title: 'Client Resources',
			description:
				'Resources and guides for clients to help them understand and work with their projects.',
			category: 'Client',
			details: [
				'How to review deliverables and provide feedback',
				'Project handover checklist and asset locations',
				'Contact and support SLAs',
			],
		},
		{
			icon: Clock,
			title: 'Project Timelines',
			description:
				'Detailed project timelines, milestones, and progress tracking documentation.',
			category: 'Management',
			details: [
				'Milestone definitions and acceptance criteria',
				'Typical delivery timelines by project size',
				'Reporting cadence and update templates',
			],
		}
]

export function KnowledgeBase() {
	const [open, setOpen] = useState(false)
	const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)

	const handleOpen = (doc: Doc) => {
		setSelectedDoc(doc)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setSelectedDoc(null)
	}

	return (
		<section className="py-24 bg-background">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
						Knowledge Base & Notes
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Comprehensive documentation, guides, and resources to help you understand and work with your projects.
						Everything you need to know, organized and accessible.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{docs.map((doc, index) => (
						<motion.div
							key={doc.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card 
								className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer"
								onClick={() => handleOpen(doc)}
							>
								<CardHeader>
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
										<doc.icon className="w-6 h-6 text-primary" />
									</div>
									<div className="flex items-center justify-between">
										<CardTitle className="text-xl">{doc.title}</CardTitle>
										<span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
											{doc.category}
										</span>
									</div>
									<CardDescription className="text-base">
										{doc.description}
									</CardDescription>
								</CardHeader>
							</Card>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<div className="bg-muted/50 rounded-2xl p-8 max-w-4xl mx-auto">
						<h3 className="text-2xl font-bold text-foreground mb-4">
							Need something specific?
						</h3>
						<p className="text-muted-foreground mb-6">
							Can&apos;t find what you&apos;re looking for? I&apos;m here to help create custom documentation
							and resources for your specific needs.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg">
								<a href="https://github.com/sm-supports/smsupports/tree/main/docs/public" target="_blank" rel="noopener noreferrer">
									Browse All Docs
								</a>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/contact">Request Documentation</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>

			{selectedDoc && (
				<Modal open={open} title={selectedDoc.title} onClose={handleClose}>
					<div className="space-y-4">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<selectedDoc.icon className="w-6 h-6 text-primary" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground mb-1">{selectedDoc.category}</p>
								<p className="text-base">{selectedDoc.description}</p>
							</div>
						</div>

						{selectedDoc.details && (
							<ul className="mt-2 space-y-2">
								{selectedDoc.details.map((d, i) => (
									<li key={i} className="flex items-start gap-3">
										<CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">{d}</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</Modal>
			)}
		</section>
	)
}
