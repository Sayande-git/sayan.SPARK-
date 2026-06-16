type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortType =
  | 'recent'
  | 'high-low'
  | 'low-high'
  | 'alphabetical'

interface FilterBarProps {
  filter: FilterType

  onFilterChange: (
    filter: FilterType
  ) => void

  sortOrder: SortType

  onSortChange: (
    sort: SortType
  ) => void

  searchTerm: string

  onSearchChange: (
    value: string
  ) => void

  onClearSearch: () => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  searchTerm,
  onSearchChange,
  onClearSearch,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        data-active={filter === 'all'}
        onClick={() =>
          onFilterChange('all')
        }
      >
        All
      </button>

      <button
        data-active={filter === 'active'}
        onClick={() =>
          onFilterChange('active')
        }
      >
        Active
      </button>

      <button
        data-active={
          filter === 'completed'
        }
        onClick={() =>
          onFilterChange(
            'completed'
          )
        }
      >
        Completed
      </button>

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>
          onSortChange(
            e.target.value as SortType
          )
        }
      >
        <option value="recent">
          Recently Added
        </option>

        <option value="high-low">
          Priority: High to Low
        </option>

        <option value="low-high">
          Priority: Low to High
        </option>

        <option value="alphabetical">
          Alphabetical
        </option>
      </select>

      <input
        id="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) =>
          onSearchChange(
            e.target.value
          )
        }
      />

      {searchTerm && (
        <button
          id="clear-search"
          type="button"
          onClick={onClearSearch}
        >
          Clear Search
        </button>
      )}
    </div>
  )
}