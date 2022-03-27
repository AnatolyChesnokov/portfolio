import React from 'react';
import PropTypes from 'prop-types';
import { email } from '../../config';
import { Sidebar } from '../index';
import { StyledLinkWrapper } from './styled';

const Email = ({ isHome }) => (
	<Sidebar isHome={isHome} orientation="right">
		<StyledLinkWrapper>
			<a href={`mailto:${email}`}>{email}</a>
		</StyledLinkWrapper>
	</Sidebar>
);

Email.propTypes = {
	isHome: PropTypes.bool,
};

export default Email;
