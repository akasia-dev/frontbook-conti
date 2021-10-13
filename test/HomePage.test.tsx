import { render } from '@testing-library/react'
import HomePage from '../pages/index'

describe('HomePage Test', () => {
  it('Text Check', () => {
    const screen = render(<HomePage />)
    const div = screen.getByText((content) => {
      return content.includes('프론트엔드')
    })
    expect(div).toBeInTheDocument()
  })
})
