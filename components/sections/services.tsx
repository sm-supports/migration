'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Palette, Image, Globe, Smartphone, Zap } from 'lucide-react'

const services = [
	{
		icon: Code,
		title: 'Web Development',
		description:
			'Modern, responsive websites and web applications built with React, Next.js, and cutting-edge technologies.',
		features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimized'],
	},
	{
		icon: Palette,
		title: 'Graphic Design',
		description: 'Professional graphic design services including logos, branding, and marketing materials.',
		features: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Print Design'],
	},
	{
		icon: Image,
		title: 'Illustration',
		description:
			'Custom illustrations and digital artwork that bring your ideas to life with unique visual storytelling.',
		features: ['Digital Art', 'Custom Illustrations', 'Icon Sets', 'Character Design'],
	},
	{
		icon: Globe,
		title: 'Full-Stack Solutions',
		description:
			'Complete web solutions from concept to deployment, including backend development and database design.',
		features: ['Backend Development', 'Database Design', 'API Integration', 'Deployment'],
	},
	{
		icon: Smartphone,
		title: 'Mobile-First Design',
		description:
			'Mobile-optimized experiences that work seamlessly across all devices and screen sizes.',
		features: ['Mobile Optimization', 'Progressive Web Apps', 'Cross-Platform', 'Touch-Friendly'],
	},
	{
		icon: Zap,
		title: 'Performance & SEO',
		description: 'Lightning-fast websites optimized for search engines and user experience.',
		features: ['SEO Optimization', 'Speed Optimization', 'Analytics Setup', 'Performance Monitoring'],
	},
]

export function Services() {
	return (
		<section className="py-16 sm:py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12 sm:mb-16"
				>
					<h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
						Services & Capabilities
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
						Everything you need to bring your digital projects to life. From concept to deployment,
						I provide comprehensive solutions that deliver results.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="touch-manipulation"
						>
							<Card className="h-full hover:shadow-lg transition-all duration-300 group">
								<CardHeader className="p-4 sm:p-6">
									<div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
										<service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
									</div>
									<CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
									<CardDescription className="text-sm sm:text-base">
										{service.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
									<ul className="space-y-2">
										{service.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center text-xs sm:text-sm text-muted-foreground"
											>
												<div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 sm:mr-3 flex-shrink-0" />
												{feature}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="text-center mt-12 sm:mt-16"
				>
					<p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
						Ready to start your project? Let&apos;s discuss how I can help bring your vision to life.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
						<Link 
							href="/contact" 
							className="btn btn-primary w-full sm:w-auto py-3 sm:py-2 min-h-[48px] sm:min-h-0 text-center"
						>
							Get Started
						</Link>
						<Link 
							href="/projects" 
							className="btn btn-secondary w-full sm:w-auto py-3 sm:py-2 min-h-[48px] sm:min-h-0 text-center"
						>
							View Portfolio
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
