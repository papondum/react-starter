import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Menu from './components/Menu';

export default (
	<div>
			<Route path="/" component={App}>
					<IndexRoute component={Menu} />
			</Route>
			<Route path ="/test" component={Menu}/>
	</div>
);
