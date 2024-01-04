import React from 'react'

export const Searchbar = ({handleSearchSubmit}) => {
  return (
    <header className="searchbar">
    <form className="form" onSubmit={handleSearchSubmit}>
        <button type="submit" className="button">
        <span className="button-label">Search</span>
        </button>
        <input
        className="input"
        name='input'
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
        />
    </form>
    </header>
  )
}
