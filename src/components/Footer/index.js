import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Icons';
import { socialMedia } from '../../config';
import { StyledCredit, StyledFooter, StyledSocialLinks } from './styled';

const Footer = () => {
	const [githubInfo, setGitHubInfo] = useState({
		stars: null,
		forks: null,
	});

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			return;
		}
		fetch('https://api.github.com/repos/bchiang7/v4')
			.then((response) => response.json())
			.then((json) => {
				const { stargazers_count, forks_count } = json;
				setGitHubInfo({
					stars: stargazers_count,
					forks: forks_count,
				});
			})
			.catch((e) => console.error(e));
	}, []);

	return (
		<StyledFooter>
			<StyledSocialLinks>
				<ul>
					{socialMedia &&
						socialMedia.map(({ name, url }, i) => (
							<li key={i}>
								<a href={url} aria-label={name}>
									<Icon name={name} />
								</a>
							</li>
						))}
				</ul>
			</StyledSocialLinks>

			<StyledCredit tabindex="-1">
				<a href="https://github.com/bchiang7/v4">
					<div>Designed &amp; Built by Anatoly Chesnokov</div>

					{githubInfo.stars && githubInfo.forks && (
						<div className="github-stats">
							<span>
								<Icon name="Star" />
								<span>{githubInfo.stars.toLocaleString()}</span>
							</span>
							<span>
								<Icon name="Fork" />
								<span>{githubInfo.forks.toLocaleString()}</span>
							</span>
						</div>
					)}
				</a>
			</StyledCredit>
		</StyledFooter>
	);
};

Footer.propTypes = {
	githubInfo: PropTypes.object,
};

export default Footer;
