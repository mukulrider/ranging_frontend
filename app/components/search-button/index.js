import React from 'react';

const SearchButton = (props) => (
   <button type="submit" className="ui-search-button">
     <span className="search-button-content">{props.text}</span>
   </button>
);

SearchButton.propTypes = {
  text: React.PropTypes.string.isRequired
};

export {SearchButton};
