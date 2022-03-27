import React, { useEffect, useRef, useState } from 'react';
//import { graphql, Link, useStaticQuery } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '../src/config';
import { Icon } from '../src/components/Icons';
import { usePrefersReducedMotion } from '../src/hooks';
import Link from 'next/link';

const StyledProjectsSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;

	h2 {
		font-size: clamp(24px, 5vw, var(--fz-heading));
	}

	.archive-link {
		font-family: var(--font-mono);
		font-size: var(--fz-sm);
		&:after {
			bottom: 0.1em;
		}
	}

	.projects-grid {
		${({ theme }) => theme.mixins.resetList};
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 15px;
		position: relative;
		margin-top: 50px;

		@media (max-width: 1080px) {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}

	.more-button {
		${({ theme }) => theme.mixins.button};
		margin: 80px auto 0;
	}
`;

const StyledProject = styled.li`
	position: relative;
	cursor: default;
	transition: var(--transition);

	@media (prefers-reduced-motion: no-preference) {
		&:hover,
		&:focus-within {
			.project-inner {
				transform: translateY(-7px);
			}
		}
	}

	a {
		position: relative;
		z-index: 1;
	}

	.project-inner {
		${({ theme }) => theme.mixins.boxShadow};
		${({ theme }) => theme.mixins.flexBetween};
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		height: 100%;
		padding: 2rem 1.75rem;
		border-radius: var(--border-radius);
		background-color: var(--light-navy);
		transition: var(--transition);
	}

	.project-top {
		${({ theme }) => theme.mixins.flexBetween};
		margin-bottom: 35px;

		.folder {
			color: var(--green);
			svg {
				width: 40px;
				height: 40px;
			}
		}

		.project-links {
			display: flex;
			align-items: center;
			margin-right: -10px;
			color: var(--light-slate);

			a {
				${({ theme }) => theme.mixins.flexCenter};
				padding: 5px 7px;

				&.external {
					svg {
						width: 22px;
						height: 22px;
						margin-top: -4px;
					}
				}

				svg {
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.project-title {
		margin: 0 0 10px;
		color: var(--lightest-slate);
		font-size: var(--fz-xxl);

		a {
			position: static;

			&:before {
				content: '';
				display: block;
				position: absolute;
				z-index: 0;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}
		}
	}

	.project-description {
		color: var(--light-slate);
		font-size: 17px;

		a {
			${({ theme }) => theme.mixins.inlineLink};
		}
	}

	.project-tech-list {
		display: flex;
		align-items: flex-end;
		flex-grow: 1;
		flex-wrap: wrap;
		padding: 0;
		margin: 20px 0 0 0;
		list-style: none;

		li {
			font-family: var(--font-mono);
			font-size: var(--fz-xxs);
			line-height: 1.75;

			&:not(:last-of-type) {
				margin-right: 15px;
			}
		}
	}
`;

const Projects = () => {
	// const data = useStaticQuery(graphql`
	// 	query {
	// 		projects: allMarkdownRemark(
	// 			filter: { fileAbsolutePath: { regex: "/projects/" }, frontmatter: { showInProjects: { ne: false } } }
	// 			sort: { fields: [frontmatter___date], order: DESC }
	// 		) {
	// 			edges {
	// 				node {
	// 					frontmatter {
	// 						title
	// 						tech
	// 						github
	// 						external
	// 					}
	// 					html
	// 				}
	// 			}
	// 		}
	// 	}
	// `);
	const data = {
		projects: {
			edges: [
				{
					node: {
						frontmatter: {
							title: 'Integrating Algolia Search with WordPress Multisite',
							tech: ['Algolia', 'WordPress', 'PHP'],
							github: '',
							external:
								'https://medium.com/stories-from-upstatement/integrating-algolia-search-with-wordpress-multisite-e2dea3ed449c',
						},
						html: '<p>Building a custom multisite compatible WordPress plugin to build global search with Algolia</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Time to Have More Fun',
							tech: ['Next.js', 'Tailwind CSS', 'Firebase'],
							github: 'https://github.com/bchiang7/time-to-have-more-fun',
							external: 'https://time-to-have-more-fun.now.sh/',
						},
						html: '<p>A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Building a Headless Mobile App CMS From Scratch',
							tech: ['Node', 'Express', 'Firebase', 'Vue'],
							github: '',
							external:
								'https://medium.com/stories-from-upstatement/building-a-headless-mobile-app-cms-from-scratch-bab2d17744d9',
						},
						html: '<p>Find out how we built a custom headless CMS with Node, Express, and Firebase for a project at Upstatement</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'OctoProfile',
							tech: ['Next.js', 'Chart.js', 'GitHub API'],
							github: 'https://github.com/bchiang7/octoprofile',
							external: 'https://octoprofile.now.sh',
						},
						html: '<p>A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and sort through your top repos by number of stars, forks, and size.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Google Keep Clone',
							tech: ['Vue', 'Firebase'],
							github: 'https://github.com/bchiang7/google-keep-vue-firebase',
							external: 'https://keep-vue.netlify.com/',
						},
						html: '<p>A simple Google Keep clone built with Vue and Firebase.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Apple Music Embeddable Web Player Widget',
							tech: ['MusicKit.js', 'JS', 'SCSS'],
							github: '',
							external: 'https://tools.applemusic.com/en-us',
						},
						html: '<p>Embeddable web player widget for Apple Music that lets users log in and listen to full song playback in the browser leveraging <a href="https://developer.apple.com/documentation/musickitjs" target="_blank" rel="nofollow noopener noreferrer">MusicKit.js</a>. Read more about this project on <a href="https://9to5mac.com/2018/06/03/apple-music-embeddable-web-player-listen-browser/" target="_blank" rel="nofollow noopener noreferrer">9to5Mac</a>.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Apple Music Facebook Messenger Integration',
							tech: ['Ember', 'JS', 'SCSS'],
							github: '',
							external:
								'https://www.theverge.com/2017/10/5/16433770/facebook-messenger-apple-music-bot-song-streaming',
						},
						html: '<p>Facebook Messenger chat bot extension featuring authentication and full song streaming from within the Messenger app. Read more about it on <a href="https://www.theverge.com/2017/10/5/16433770/facebook-messenger-apple-music-bot-song-streaming" target="_blank" rel="nofollow noopener noreferrer">The Verge</a>.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Personal Website V3',
							tech: ['Jekyll', 'SCSS', 'JS'],
							github: 'https://github.com/bchiang7/bchiang7.github.io',
							external: 'https://bchiang7.github.io/v3/',
						},
						html: '<p>Third iteration of my personal website built with Jekyll and hosted on GitHub Pages.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Personal Website V2',
							tech: ['Jekyll', 'SCSS', 'JS'],
							github: 'https://github.com/bchiang7/v2',
							external: 'https://bchiang7.github.io/v2/',
						},
						html: '<p>Second iteration of my personal website. Designed and developed with a conscious effort to avoid using any superfluous frameworks like Bootstrap.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Screentime 2.0',
							tech: ['Cordova', 'Backbone', 'Marionette'],
							github: '',
							external:
								'https://starry.com/blog/product/whats-new-screentime-just-got-better-for-parents',
						},
						html: '<p>Starry Station android app feature that provided users with the ability to easily filter content, pause the internet, and even create custom rules for blocking apps like Facebook and Twitter right from their phones.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'React Profile',
							tech: ['React', 'CSS'],
							github: 'https://github.com/bchiang7/react-profile',
							external: 'https://bchiang7.github.io/react-profile/',
						},
						html: '<p>Online version of my 2016 resume made for fun. I was interested in learning React.js, so I found a simple tutorial and it spun into a weekend project.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Personal Website V1',
							tech: ['HTML', 'CSS', 'JS', 'Bootstrap'],
							github: 'https://github.com/bchiang7/v1',
							external: 'https://bchiang7.github.io/v1/',
						},
						html: '<p>My first portfolio website I designed and built in 2014. I learned quite a bit about HTML, CSS, and SEO. Since then, I think my web development and design skills have improved immensely.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Fontipsums',
							tech: ['HTML', 'SCSS'],
							github: 'https://github.com/bchiang7/fontipsums/',
							external: 'http://bchiang7.github.io/fontipsums/',
						},
						html: '<p>Simple website to display some of my favorite font pairings combined with some fun lorem ipsum variations found on the web.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'NU Women in Tech',
							tech: ['Jekyll', 'Bootstrap'],
							github: 'https://github.com/nuwit/website',
							external: 'https://nuwit.ccs.neu.edu/',
						},
						html: '<p>Complete overhaul and redesign of NU Women in Tech’s club website using Jekyll, built while serving as web chair on the e-board.</p>',
					},
				},
			],
		},
	};

	const [showMore, setShowMore] = useState(false);
	const revealTitle = useRef(null);
	const revealArchiveLink = useRef(null);
	const revealProjects = useRef([]);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}
		async function animate() {
			if (revealTitle.current) {
				const sr = (await import('scrollreveal')).default;
				sr().reveal(revealTitle.current, srConfig());
				sr().reveal(revealArchiveLink.current, srConfig());
				revealProjects.current.forEach((ref, i) => sr().reveal(ref, srConfig(i * 100)));
			}
		}
		animate();
	}, []);

	const GRID_LIMIT = 6;
	const projects = data.projects.edges.filter(({ node }) => node);
	const firstSix = projects.slice(0, GRID_LIMIT);
	const projectsToShow = showMore ? projects : firstSix;

	const projectInner = (node) => {
		const { frontmatter, html } = node;
		const { github, external, title, tech } = frontmatter;

		return (
			<div className="project-inner">
				<header>
					<div className="project-top">
						<div className="folder">
							<Icon name="Folder" />
						</div>
						<div className="project-links">
							{github && (
								<a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
									<Icon name="GitHub" />
								</a>
							)}
							{external && (
								<a
									href={external}
									aria-label="External Link"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									<Icon name="External" />
								</a>
							)}
						</div>
					</div>

					<h3 className="project-title">
						<a href={external} target="_blank" rel="noreferrer">
							{title}
						</a>
					</h3>

					<div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
				</header>

				<footer>
					{tech && (
						<ul className="project-tech-list">
							{tech.map((tech, i) => (
								<li key={i}>{tech}</li>
							))}
						</ul>
					)}
				</footer>
			</div>
		);
	};

	return (
		<StyledProjectsSection>
			<h2 ref={revealTitle}>Other Noteworthy Projects</h2>

			<Link className="inline-link archive-link" href="/archive" ref={revealArchiveLink}>
				view the archive
			</Link>

			<ul className="projects-grid">
				{prefersReducedMotion ? (
					<>
						{projectsToShow &&
							projectsToShow.map(({ node }, i) => (
								<StyledProject key={i}>{projectInner(node)}</StyledProject>
							))}
					</>
				) : (
					<TransitionGroup component={null}>
						{projectsToShow &&
							projectsToShow.map(({ node }, i) => (
								<CSSTransition
									key={i}
									classNames="fadeup"
									timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
									exit={false}
								>
									<StyledProject
										key={i}
										ref={(el) => (revealProjects.current[i] = el)}
										style={{
											transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
										}}
									>
										{projectInner(node)}
									</StyledProject>
								</CSSTransition>
							))}
					</TransitionGroup>
				)}
			</ul>

			<button className="more-button" onClick={() => setShowMore(!showMore)}>
				Show {showMore ? 'Less' : 'More'}
			</button>
		</StyledProjectsSection>
	);
};

export default Projects;
