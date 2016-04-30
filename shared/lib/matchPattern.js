import { matchPattern as match } from 'react-router/lib/PatternUtils'

// another option is using route-pattern
// https://github.com/bjoerge/route-pattern
export default function matchPattern (pattern, pathname) {
  const matched = match(pattern, pathname)
  return matched && matched.remainingPathname === ''
}
