/** Stub: Complete Challenge 13 (Query with Parameters) per README. */


import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../api/apiSlice'

const PostDetail = () => {
  const { postId } = useParams()
  const id = postId ? Number(postId) : undefined

  const { data, isLoading, isError } = useGetPostByIdQuery(id as number, {
    skip: !id,
  })

  if (isLoading) {
    return <p data-testid="post-detail-loading">Loading...</p>
  }

  if (isError) {
    return <p data-testid="post-detail-error">Failed to load post.</p>
  }

  if (!data) {
    return <p data-testid="post-detail">No post found.</p>
  }

  return (
    <div data-testid="post-detail">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <small>User ID: {data.userId}</small>
    </div>
  )
}

export default PostDetail
