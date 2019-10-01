import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

window.localStorage.setItem('loggedBlogappUser', '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoYXJsaWUiLCJpZCI6IjVkOGI5NTcwOGY5MzU0ZjY1ZmM2YTM3ZCIsImlhdCI6MTU2OTg1NzY0MH0.1iyV0uDiROS-A0H_azGEh2a4Z67NVoyZxZmFL02gUI0","username":"Charlie","name":"Charlie","id":"5d8b95708f9354f65fc6a37d"}')

test('clicking div will expand it to contain more information', () => {
  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    likes: 7,
    url: 'www.url.com',
    user: {
      id: '5d8b95708f9354f65fc6a37d',
      name: 'Charlie',
      username: 'Charlie'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler}/>
  )

  const button = component.container.querySelector('.blog')
  const div = component.container.querySelector('.blogContent')
  const likesDiv = component.container.querySelector('.likesDiv')


  expect(div).toHaveTextContent('This is the title')
  expect(div).toHaveTextContent('This is the author')
  console.log(prettyDOM(button))
  console.log(prettyDOM(likesDiv))
  console.log(prettyDOM(div))

  fireEvent.click(button)

  expect(div).toHaveTextContent('This is the title')
  expect(div).toHaveTextContent('This is the author')
  expect(likesDiv).toHaveTextContent('7')

})


test('renders only title and author on load', () => {

  const blog = {
    title: 'This is the title',
    author: 'This is the author',
    likes: 7,
    url: 'www.url.com',
    user: {
      id: '5d8b95708f9354f65fc6a37d',
      name: 'Charlie',
      username: 'Charlie'
    }

  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blogContent')
  const likesDiv = component.container.querySelector('.blogLikes')
  expect(div).toHaveTextContent('This is the title')
  expect(div).toHaveTextContent('This is the author')
  expect(likesDiv).toBe(null)

  console.log(prettyDOM(div))

})
