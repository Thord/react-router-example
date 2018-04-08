import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import { Content } from './styles/AppStyles'

import { log } from '../lib/tools'

import { topics } from './topics'


function Resource ({ match }) {
  const topic = topics.find(({ id }) => id === match.params.topicId)
    .resources.find(({ id }) => id === match.params.subId)

  return (
    <div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <a href={topic.url}>More info.</a>
    </div>
  )
}

const Topic = ({ topic, match }) => {
  log(topic, match)
  return (
    <div>
      <h2>{topic.name}</h2>
      <p>{topic.description}</p>

      <ul>
        {topic.resources.map(sub => (
          <li key={sub.id}>
            <Link to={`${match.url}/${sub.id}`}>{sub.name}</Link>
          </li>
        ))}
      </ul>

      <hr />

      <Route path={`${match.path}/:subId`} component={Resource} />
    </div>
  )
}


class Topics extends Component {
  state = { open: false }

  handleClick = value => {
    this.setState({ open: value })
  }

  render () {
    const { match } = this.props
    const { open } = this.state
    return (
      <div>
        <h1>Topics</h1>
        <ul style={{ padding: '5px', listStyleType: 'none' }} >
          {topics.map(({ name, id }) => (
            <li style={{ border: 'solid green 2px', width: '300px', padding: '5px' }} key={id} 
              className={(open===id) ? 'open' : null}>
              <Link to={`${match.url}/${id}`} 
                onClick={() => this.handleClick(id)}>{name}</Link>
              <div>
                {
                  open===id ? <Route path={`${match.path}/:topicId`} render={({ match }) => (
                    <Topic
                      topic={topics.find(({ id }) => id === match.params.topicId)}
                      match={match}
                    />)}
                  /> : null
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Router>
        <Content>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route path="/topics" component={Topics} />
        </Content>
      </Router>
    )
  }
}

export default App
