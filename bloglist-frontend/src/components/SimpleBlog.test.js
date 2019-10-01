import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('clicking the button twice will call the event handler twice', () => {
  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    likes: 7
  }

  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}/>
  )

  const button = getByText('like this')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})

test('renders all blog data', () => {
  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    likes: 7
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blogContent')
  const likesDiv = component.container.querySelector('.blogLikes')
  expect(div).toHaveTextContent('This is the title')
  expect(div).toHaveTextContent('This is the author')
  expect(likesDiv).toHaveTextContent('7')

  console.log(prettyDOM(div))

})
