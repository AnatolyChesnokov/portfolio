import React, { useEffect, useRef } from 'react';
//import { graphql, useStaticQuery } from 'gatsby';
//import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Image from 'next/image';
import styled from 'styled-components';
import { srConfig } from '../src/config';
import { Icon } from '../src/components/Icons';
import { usePrefersReducedMotion } from '../src/hooks';

const StyledProjectsGrid = styled.ul`
	${({ theme }) => theme.mixins.resetList};

	a {
		position: relative;
		z-index: 1;
	}
`;

const StyledProject = styled.li`
	position: relative;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(12, 1fr);
	align-items: center;

	@media (max-width: 768px) {
		${({ theme }) => theme.mixins.boxShadow};
	}

	&:not(:last-of-type) {
		margin-bottom: 100px;

		@media (max-width: 768px) {
			margin-bottom: 70px;
		}

		@media (max-width: 480px) {
			margin-bottom: 30px;
		}
	}

	&:nth-of-type(odd) {
		.project-content {
			grid-column: 7 / -1;
			text-align: right;

			@media (max-width: 1080px) {
				grid-column: 5 / -1;
			}
			@media (max-width: 768px) {
				grid-column: 1 / -1;
				padding: 40px 40px 30px;
				text-align: left;
			}
			@media (max-width: 480px) {
				padding: 25px 25px 20px;
			}
		}
		.project-tech-list {
			justify-content: flex-end;

			@media (max-width: 768px) {
				justify-content: flex-start;
			}

			li {
				margin: 0 0 5px 20px;

				@media (max-width: 768px) {
					margin: 0 10px 5px 0;
				}
			}
		}
		.project-links {
			justify-content: flex-end;
			margin-left: 0;
			margin-right: -10px;

			@media (max-width: 768px) {
				justify-content: flex-start;
				margin-left: -10px;
				margin-right: 0;
			}
		}
		.project-image {
			grid-column: 1 / 8;

			@media (max-width: 768px) {
				grid-column: 1 / -1;
			}
		}
	}

	.project-content {
		position: relative;
		grid-column: 1 / 7;
		grid-row: 1 / -1;

		@media (max-width: 1080px) {
			grid-column: 1 / 9;
		}

		@media (max-width: 768px) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			grid-column: 1 / -1;
			padding: 40px 40px 30px;
			z-index: 5;
		}

		@media (max-width: 480px) {
			padding: 30px 25px 20px;
		}
	}

	.project-overline {
		margin: 10px 0;
		color: var(--green);
		font-family: var(--font-mono);
		font-size: var(--fz-xs);
		font-weight: 400;
	}

	.project-title {
		color: var(--lightest-slate);
		font-size: clamp(24px, 5vw, 28px);

		@media (min-width: 768px) {
			margin: 0 0 20px;
		}

		@media (max-width: 768px) {
			color: var(--white);

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
	}

	.project-description {
		${({ theme }) => theme.mixins.boxShadow};
		position: relative;
		z-index: 2;
		padding: 25px;
		border-radius: var(--border-radius);
		background-color: var(--light-navy);
		color: var(--light-slate);
		font-size: var(--fz-lg);

		@media (max-width: 768px) {
			padding: 20px 0;
			background-color: transparent;
			box-shadow: none;

			&:hover {
				box-shadow: none;
			}
		}

		a {
			${({ theme }) => theme.mixins.inlineLink};
		}

		strong {
			color: var(--white);
			font-weight: normal;
		}
	}

	.project-tech-list {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		z-index: 2;
		margin: 25px 0 10px;
		padding: 0;
		list-style: none;

		li {
			margin: 0 20px 5px 0;
			color: var(--light-slate);
			font-family: var(--font-mono);
			font-size: var(--fz-xs);
			white-space: nowrap;
		}

		@media (max-width: 768px) {
			margin: 10px 0;

			li {
				margin: 0 10px 5px 0;
				color: var(--lightest-slate);
			}
		}
	}

	.project-links {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 10px;
		margin-left: -10px;
		color: var(--lightest-slate);

		a {
			${({ theme }) => theme.mixins.flexCenter};
			padding: 10px;

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

		.cta {
			${({ theme }) => theme.mixins.smallButton};
			margin: 10px;
		}
	}

	.project-image {
		${({ theme }) => theme.mixins.boxShadow};
		grid-column: 6 / -1;
		grid-row: 1 / -1;
		position: relative;
		z-index: 1;

		@media (max-width: 768px) {
			grid-column: 1 / -1;
			height: 100%;
			opacity: 0.25;
		}

		a {
			width: 100%;
			height: 100%;
			background-color: var(--green);
			border-radius: var(--border-radius);
			vertical-align: middle;

			&:hover,
			&:focus {
				background: transparent;
				outline: 0;

				&:before,
				.img {
					background: transparent;
					filter: none;
				}
			}

			&:before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 3;
				transition: var(--transition);
				background-color: var(--navy);
				mix-blend-mode: screen;
			}
		}

		.img {
			border-radius: var(--border-radius);
			mix-blend-mode: multiply;
			filter: grayscale(100%) contrast(1) brightness(90%);

			@media (max-width: 768px) {
				object-fit: cover;
				width: auto;
				height: 100%;
				filter: grayscale(100%) contrast(1) brightness(50%);
			}
		}
	}
`;

const Featured = () => {
	// const data = useStaticQuery(graphql`
	// 	{
	// 		featured: allMarkdownRemark(
	// 			filter: { fileAbsolutePath: { regex: "/featured/" } }
	// 			sort: { fields: [frontmatter___date], order: ASC }
	// 		) {
	// 			edges {
	// 				node {
	// 					frontmatter {
	// 						title
	// 						cover {
	// 							childImageSharp {
	// 								gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
	// 							}
	// 						}
	// 						tech
	// 						github
	// 						external
	// 						cta
	// 					}
	// 					html
	// 				}
	// 			}
	// 		}
	// 	}
	// `);
	const data = {
		featured: {
			edges: [
				{
					node: {
						frontmatter: {
							title: 'Halcyon Theme',
							cover: {
								childImageSharp: {
									gatsbyImageData: {
										layout: 'constrained',
										placeholder: {
											fallback:
												'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVQoz23O7W6bMBQGYO5iSoEY7GBjY2MwH/6AJk3SrStVlQbabJq23f9lTCRR1x+VHllH57zHtie76VOZmbidhDuf9vOMl7vxgyl3k7Bj2b/uH093D6dm89rfv3X7N2Gny/Rj3hP2+J+Zcf2iuvHv7x/jdHo5vv359fM4nrL2Ov2Y94R5eSfdUXZj4UbpRqaP3BxzN3Izk+4qn9+45j2uD1wfhDlwc5BuLLqp6Maz6XLLpX4vcnvk5zA3B4+3z0I/0XpgzROrh7Sa0Xq4dLL2Oa0er+qBzc2B1XOeNoPH6iHhOiblTSQT0SNuAFE+Uj4sfVjG1CTCkWIdEwNQuYjLm7j0oQqQiqjziHpIWJPr9ZI6IDa0vaftGkoXi36ZuiXRMe9w+ZVXD7zdFlUPM+OjClJDilsvVd8xazBvF7EE1LF6l5s9re6R3GK5BakNsUGpw/ldVN5JZRKpfVQBXENmPVJ+A6hEpFlEwk8aLG+pcii3ATbBqvGhilKbFDuidqxaA96F2IH5RyYkxlvJPYhFKjdLogOssVpz2ydNH3MN0yZMKjAvb0W9E/WGlBvIbudNrENqvVW+A7Egol/AMsQaFWskWsRNIjrITLCqQGri1BLek9zBrLmBlT9Ty6T1VmIbRDxaqS9hFiRNgFsf1T6q3oHUQNbHqQXMwsxA2kbUAKLDpP0H4Daf056mKVMAAAAASUVORK5CYII=',
										},
										images: {
											fallback: {
												src: '/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/d2194/halcyon.png',
												srcSet: '/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/cebcc/halcyon.png 175w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/272cf/halcyon.png 350w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/d2194/halcyon.png 700w',
												sizes: '(min-width: 700px) 700px, 100vw',
											},
											sources: [
												{
													srcSet: '/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/9aa63/halcyon.avif 175w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/e6db6/halcyon.avif 350w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/f47db/halcyon.avif 700w',
													type: 'image/avif',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
												{
													srcSet: '/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/240e7/halcyon.webp 175w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/faefe/halcyon.webp 350w,\n/static/3b4d6e8f44baf7e6d7a0ed4b3e4d8d39/d5dc4/halcyon.webp 700w',
													type: 'image/webp',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
											],
										},
										width: 700,
										height: 438,
									},
								},
							},
							tech: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
							github: 'https://github.com/bchiang7/halcyon-site',
							external: 'https://halcyon-theme.netlify.com/',
							cta: null,
						},
						html: '<p>A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on <a href="https://marketplace.visualstudio.com/items?itemName=brittanychiang.halcyon-vscode" target="_blank" rel="nofollow noopener noreferrer">Visual Studio Marketplace</a>, <a href="https://packagecontrol.io/packages/Halcyon%20Theme" target="_blank" rel="nofollow noopener noreferrer">Package Control</a>, <a href="https://atom.io/themes/halcyon-syntax" target="_blank" rel="nofollow noopener noreferrer">Atom Package Manager</a>, and <a href="https://www.npmjs.com/package/hyper-halcyon-theme" target="_blank" rel="nofollow noopener noreferrer">npm</a>.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Spotify Profile',
							cover: {
								childImageSharp: {
									gatsbyImageData: {
										layout: 'constrained',
										placeholder: {
											fallback:
												'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcElEQVQoz32Q0U7bQBBF/RogjuOynpmdXW/W2E4cEwEhjgmymqpq+tg8tEWq2opf4hf6p5VjZJBjuE+r2b177h3HtQEKQMKOCOvxOb4nZ4gfMOhxngOUEX+NWCHAW+aTwSkRdZxANAHxb796+v35nkGQJOoze57fgxUi8Nxv5Wb/4xeTGo896MM7TAz4ckFEQoiiKL7sdutqu6k+fdxuq6oyxgRBt54zcr3OCABms9myWK2L1WKRXy+vy81dqMNjuOMemRGxhjABIisOCAQEcIQ9kEc95nqFAFEUZVkmpaSDeszucNSmPc7fDNtD56UzPHOllNNpMjuIiACAmefzubWWiOIkzrIsTdPGppTK8zwM6xU4g8GJ1ubqqkySxFrbfq+YASCJ401RXsQXYRi2jZRSzPzcmVlf5kuttZTydeyx79/eLB++/zTGWGujg5RSANCsoO5MRFpze9ESfH+8KtZ//j5OJqZJnqapMQYRG/J/k6JW26WIe1kAAAAASUVORK5CYII=',
										},
										images: {
											fallback: {
												src: '/static/3936989a99991beb6d649d7a7039df60/d2194/demo.png',
												srcSet: '/static/3936989a99991beb6d649d7a7039df60/cebcc/demo.png 175w,\n/static/3936989a99991beb6d649d7a7039df60/272cf/demo.png 350w,\n/static/3936989a99991beb6d649d7a7039df60/d2194/demo.png 700w',
												sizes: '(min-width: 700px) 700px, 100vw',
											},
											sources: [
												{
													srcSet: '/static/3936989a99991beb6d649d7a7039df60/9aa63/demo.avif 175w,\n/static/3936989a99991beb6d649d7a7039df60/e6db6/demo.avif 350w,\n/static/3936989a99991beb6d649d7a7039df60/f47db/demo.avif 700w',
													type: 'image/avif',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
												{
													srcSet: '/static/3936989a99991beb6d649d7a7039df60/240e7/demo.webp 175w,\n/static/3936989a99991beb6d649d7a7039df60/faefe/demo.webp 350w,\n/static/3936989a99991beb6d649d7a7039df60/d5dc4/demo.webp 700w',
													type: 'image/webp',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
											],
										},
										width: 700,
										height: 438,
									},
								},
							},
							tech: ['React', 'Styled Components', 'Express', 'Spotify API', 'Heroku'],
							github: 'https://github.com/bchiang7/spotify-profile',
							external: 'https://spotify-profile.herokuapp.com/',
							cta: null,
						},
						html: '<p>A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.</p>',
					},
				},
				{
					node: {
						frontmatter: {
							title: 'Build a Spotify Connected App',
							cover: {
								childImageSharp: {
									gatsbyImageData: {
										layout: 'constrained',
										placeholder: {
											fallback:
												'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACqklEQVQozwGfAmD9AKa44Jeq3Iqd1H+SznaIynKDx2+Ax2x9xWt8xWt8xmx+x2+ByXKDzXmK0HyO04WX142f2pKn3J2x3qW64QCgtdyps82VptSQotSImtB4jMlpfsJofcJle8FrgMRvhMZ1i8mBlc96ks2quuCQp9ePqdajut2Vs9ebu9cAmrHal6XDj6XSiqHTg5rOc4zHZH/AZX/AX3u9fZXJrLzcsMDfrsDelq/U5uz1r8bfmLjVvtXkjrnOjrzNAJWz3IGj1XaWy2yMxWSEwGGCvl5/u1l8ulp/ull/uV+Gu2ONvGGOumeWvY20zHSnwHSrv4S4xXy3wIPAwQCJq9FsX2JiXGFYYGtYXmhQV2FUW2dqi7hmkMJulsFnlb1ilblvob5pobpqpbh7tL9ztLpos7FvvLJ1w7MAg6jLQzk3Pzk3RURCRkRDNjUzQD8/nLfPlbnXlrrSjLfNea7ClMLMnMnOl8rJn9LNk87FYLymX8CkZ8emAHypzC0vMygsMyYrMCUnKC8vLFBQS2SRsWumyWmkwGanvGSqt2yyt3K7t2u7sGvArXHGrWjHplbFmFrKmQB4rM0pJSMzKygwKignIyAgGBI9ODN7qsGOw9iLws+Iw8uFxcaEycGW08d8zLaJ1LuZ3cKQ27tPypBQzo8AebrdWX2NX36PU3eNQm6FLlpuJ1RnO5KxPaK9O6KxOqaqOquiObCaNLORMrmKNr+GPMWGOseBP8yCStKIAH3J7G/F72C97FS35kuy4Eax20Kx1j2rxzqrvTqvtTmyqzi2ojm6mlHGn1nMnlDOlFHQkVnVk0/Ui0TUggB3zO9mw+pYveZNuOFCs9s6sNQ2r80zscgys78xtbUxuaoxvJ8ywJZJy5pS0ZlQ05JO1YxY2ZBU2otE138AtHoe7OPKgAAAAABJRU5ErkJggg==',
										},
										images: {
											fallback: {
												src: '/static/4e06bd39766c182ea26b255309b1dee1/bc3b9/course-card.png',
												srcSet: '/static/4e06bd39766c182ea26b255309b1dee1/9a130/course-card.png 175w,\n/static/4e06bd39766c182ea26b255309b1dee1/a3fa1/course-card.png 350w,\n/static/4e06bd39766c182ea26b255309b1dee1/bc3b9/course-card.png 700w,\n/static/4e06bd39766c182ea26b255309b1dee1/87926/course-card.png 1400w',
												sizes: '(min-width: 700px) 700px, 100vw',
											},
											sources: [
												{
													srcSet: '/static/4e06bd39766c182ea26b255309b1dee1/dae43/course-card.avif 175w,\n/static/4e06bd39766c182ea26b255309b1dee1/d7667/course-card.avif 350w,\n/static/4e06bd39766c182ea26b255309b1dee1/7ec1a/course-card.avif 700w,\n/static/4e06bd39766c182ea26b255309b1dee1/71a30/course-card.avif 1400w',
													type: 'image/avif',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
												{
													srcSet: '/static/4e06bd39766c182ea26b255309b1dee1/5d873/course-card.webp 175w,\n/static/4e06bd39766c182ea26b255309b1dee1/26a00/course-card.webp 350w,\n/static/4e06bd39766c182ea26b255309b1dee1/f23f0/course-card.webp 700w,\n/static/4e06bd39766c182ea26b255309b1dee1/2c2d0/course-card.webp 1400w',
													type: 'image/webp',
													sizes: '(min-width: 700px) 700px, 100vw',
												},
											],
										},
										width: 700,
										height: 394,
									},
								},
							},
							tech: ['React', 'Express', 'Spotify API', 'Styled Components'],
							github: null,
							external: 'https://www.newline.co/courses/build-a-spotify-connected-app',
							cta: 'https://www.newline.co/courses/build-a-spotify-connected-app',
						},
						html: "<p>Having struggled with understanding how the Spotify OAuth flow works, I made the course I wish I could have had.</p>\n<p>Unlike tutorials that only cover a few concepts and leave you with half-baked GitHub repositories, this course covers everything from explaining the principles of REST APIs to implementing Spotify's OAuth flow and fetching API data in a React app. By the end of the course, you’ll have an app deployed to the internet you can add to your portfolio.</p>",
					},
				},
			],
		},
	};

	const featuredProjects = data.featured.edges.filter(({ node }) => node);
	const revealTitle = useRef(null);
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
				revealProjects.current.forEach((ref, i) => sr().reveal(ref, srConfig(i * 100)));
			}
		}
		animate();
	}, []);

	return (
		<section id="projects">
			<h2 className="numbered-heading" ref={revealTitle}>
				Some Things I’ve Built
			</h2>

			<StyledProjectsGrid>
				{featuredProjects &&
					featuredProjects.map(({ node }, i) => {
						const { frontmatter, html } = node;
						const { external, title, tech, github, cover, cta } = frontmatter;
						//const image = getImage(cover);
						const image = '';

						return (
							<StyledProject key={i} ref={(el) => (revealProjects.current[i] = el)}>
								<div className="project-content">
									<div>
										<p className="project-overline">Featured Project</p>

										<h3 className="project-title">
											<a href={external}>{title}</a>
										</h3>

										<div
											className="project-description"
											dangerouslySetInnerHTML={{ __html: html }}
										/>

										{tech.length && (
											<ul className="project-tech-list">
												{tech.map((tech, i) => (
													<li key={i}>{tech}</li>
												))}
											</ul>
										)}

										<div className="project-links">
											{cta && (
												<a href={cta} aria-label="Course Link" className="cta">
													Learn More
												</a>
											)}
											{github && (
												<a href={github} aria-label="GitHub Link">
													<Icon name="GitHub" />
												</a>
											)}
											{external && !cta && (
												<a href={external} aria-label="External Link" className="external">
													<Icon name="External" />
												</a>
											)}
										</div>
									</div>
								</div>

								<div className="project-image">
									<a href={external ? external : github ? github : '#'}>
										{/*<Image />*/}
										{/*<GatsbyImage image={image} alt={title} className="img" />*/}
									</a>
								</div>
							</StyledProject>
						);
					})}
			</StyledProjectsGrid>
		</section>
	);
};

export default Featured;
