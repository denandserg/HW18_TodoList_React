import React from 'react';

import './item-status-filter.css';

export default  class ItemStatusFilter extends React.Component {
    render() {
        const { filter, onFilterChange } = this.props;
        const newFilter = filter === 'all' ? 'not-done' : 'all';
        return (
            <div className="form-check">
                    <input type="checkbox"
                           className="form-check-input"
                           id="filter"
                           onClick={() => onFilterChange(newFilter)}
                    />
                        <label className="form-check-label"
                               htmlFor="filter">Filter by
                            unfinished tasks</label>
                </div>
        );
    }
}
