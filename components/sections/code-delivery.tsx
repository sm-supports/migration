'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GitBranch, Code, Zap, Shield, Clock, CheckCircle } from 'lucide-react'

const features = [
	{
		icon: GitBranch,
		title: 'Version Control',
		description:
			'All code is managed with Git, ensuring clean version history and easy collaboration.',
		color: 'text-blue-500',
	},
	{
		icon: Code,
		title: 'Clean Code',
		description:
			'Well-documented, maintainable code following industry best practices and standards.',
		color: 'text-green-500',
	},
	{
		icon: Zap,
		title: 'Fast Delivery',
		description:
			'Efficient development process with regular updates and quick turnaround times.',
		color: 'text-yellow-500',
	},
	{
		icon: Shield,
		title: 'Quality Assurance',
		description:
			'Thorough testing and code review to ensure reliable, bug-free applications.',
		color: 'text-purple-500',
	},
	{
		icon: Clock,
		title: 'Timely Updates',
		description:
			'Regular progress updates and milestone deliveries to keep you informed.',
		color: 'text-orange-500',
	},
	{
		icon: CheckCircle,
		title: 'Deployment Ready',
		description:
			'Production-ready code with proper deployment configurations and documentation.',
		color: 'text-emerald-500',
	},
]

export function CodeDelivery() {
	return (
		<section className="py-24 bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
							Code & Delivery
						</h2>

						<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
							Professional development workflow with clean code, version control,
							and reliable delivery. Your project is in good hands with
							industry-standard practices and transparent processes.
						</p>

						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
									<GitBranch className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Git Workflow
									</h3>
									<p className="text-muted-foreground">
										Clean commit history, feature branches, and pull requests ensure
										organized development and easy collaboration.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
									<Code className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										Code Quality
									</h3>
									<p className="text-muted-foreground">
										TypeScript, ESLint, Prettier, and comprehensive testing ensure
										maintainable, scalable, and bug-free code.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
									<Zap className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										CI/CD Pipeline
									</h3>
									<p className="text-muted-foreground">
										Automated testing, building, and deployment processes for
										reliable and consistent delivery.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 mt-8">
							<Button asChild size="lg" className="group">
								<a
									href="https://github.com/orgs/sm-supports/repositories"
									target="_blank"
									rel="noopener noreferrer"
								>
									<GitBranch className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
									View GitHub
								</a>
							</Button>
						
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{features.map((feature, index) => (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<Card className="h-full hover:shadow-lg transition-all duration-300 group">
										<CardHeader className="pb-3">
											<div
												className={`w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors`}
											>
												<feature.icon className={`w-5 h-5 ${feature.color}`} />
											</div>
											<CardTitle className="text-lg">
												{feature.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-sm">
												{feature.description}
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
