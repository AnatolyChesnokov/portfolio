import React from 'react';
import PropTypes from 'prop-types';
import { socialMedia } from '../../config';
import { Sidebar } from '../';
import { Icon } from '../Icons';
import { StyledSocialList } from './styled';

const Social = ({ isHome }) => (
	<Sidebar isHome={isHome} orientation="left">
		<StyledSocialList>
			{socialMedia &&
				socialMedia.map(({ url, name }, i) => (
					<li key={i}>
						<a href={url} aria-label={name} target="_blank" rel="noreferrer">
							<Icon name={name} />
						</a>
					</li>
				))}
		</StyledSocialList>
	</Sidebar>
);

Social.propTypes = {
	isHome: PropTypes.bool,
};

export default Social;
