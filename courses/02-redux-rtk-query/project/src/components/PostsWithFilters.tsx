import { useGetPostsQuery } from '../api/apiSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSortBy } from '../store/slices/filtersSlice'

const PostsWithFilters = () => {
  const { data = [], isLoading } = useGetPostsQuery()
  const { sortBy } = useAppSelector(state => state.filters)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return <p>Loading...</p>
  }

  const posts = [...data].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id - a.id
    }
    return a.id - b.id
  })

  return (
    <div data-testid="posts-with-filters">
      <div data-testid="filter-controls">
        <select
          value={sortBy}
          onChange={e => dispatch(setSortBy(e.target.value))}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostsWithFilters
