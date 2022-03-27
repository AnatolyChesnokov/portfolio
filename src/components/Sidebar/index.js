import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { loaderDelay } from '../../utils';
import { usePrefersReducedMotion } from '../../hooks';
import { StyledSideElement } from './styled';

const Sidebar = ({ children, isHome, orientation }) => {
	const [isMounted, setIsMounted] = useState(!isHome);
	const prefersReducedMotion = usePrefersReducedMotion();

	useEffect(() => {
		if (!isHome || prefersReducedMotion) {
			return;
		}
		const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<StyledSideElement orientation={orientation}>
			{prefersReducedMotion ? (
				<>{children}</>
			) : (
				<TransitionGroup component={null}>
					{isMounted && (
						<CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? loaderDelay : 0}>
							{children}
						</CSSTransition>
					)}
				</TransitionGroup>
			)}
		</StyledSideElement>
	);
};

Sidebar.propTypes = {
	children: PropTypes.node.isRequired,
	isHome: PropTypes.bool,
	orientation: PropTypes.string,
};

export default Sidebar;
