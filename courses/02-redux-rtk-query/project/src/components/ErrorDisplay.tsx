/** Stub: Complete Challenge 12 (Error and Loading UX) per README. */
import type { FetchBaseQueryError, SerializedError } from '@reduxjs/toolkit/query'

interface ErrorDisplayProps {
  error: FetchBaseQueryError | SerializedError | undefined
  onRetry?: () => void
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  const message =
    error && 'error' in error
      ? String(error.error)
      : 'Something went wrong.'

  return (
    <div data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button data-testid="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay
