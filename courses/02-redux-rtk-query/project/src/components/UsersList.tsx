import { useGetUsersQuery } from '../api/apiSlice'

const UsersList = () => {
  const { data, isLoading, error } = useGetUsersQuery()

  if (isLoading) {
    return <p data-testid="users-loading">Loading.....</p>
  }

  if (error) {
    return <p data-testid="users-error">Something went wrong.</p>
  }

  return (
    <div data-testid="users-list">
      {data?.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  )
}

export default UsersList
