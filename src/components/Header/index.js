import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Header = ({ title, description, image }) => {
	const { pathname } = useRouter();
	const meta = {
		defaultTitle: 'Anatoly Chesnokov',
		defaultDescription:
			'Anatoly Chesnokov is a software engineer who specializes in building (and occasionally designing) exceptional digital experiences.',
		siteUrl: 'http://firebase.google.com',
		defaultImage: null,
		twitterUsername: '@anatolyChe',
	};

	const { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } = meta;

	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		image: `${siteUrl}${image || defaultImage}`,
		url: `${siteUrl}${pathname}`,
	};

	return (
		<Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
			<html lang="en" />

			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />

			<meta property="og:title" content={seo.title} />
			<meta property="og:description" content={seo.description} />
			<meta property="og:image" content={seo.image} />
			<meta property="og:url" content={seo.url} />
			<meta property="og:type" content="website" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={twitterUsername} />
			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:description" content={seo.description} />
			<meta name="twitter:image" content={seo.image} />

			<meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
		</Helmet>
	);
};

export default Header;

Header.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
};

Header.defaultProps = {
	title: null,
	description: null,
	image: null,
};
