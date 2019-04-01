import React, { Component } from 'react'
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Navigation from './comp/Navigation'
import theme from './comp/Theme'
import CreateJobPage from './comp/CreateJobPage'
import JobListPage from './comp/JobListPage'
import JobPage from './comp/JobPage'
import LoginPage from './comp/LoginPage'
import Footer from './comp/Footer'
import JobsAPI from './api/JobsAPI'
import ToS from './comp/ToS'
import PrivacyPolicy from './comp/PrivacyPolicy'
import Dashboard from './comp/Dashboard'

const NotFound = () => <div>Not Found 404</div>

class App extends Component {

  state = {
    user: undefined,
    isLoggedIn: undefined,
    jobs: [],
    filtered: [],
    keyword: '',
    loading: false
  }
  // sprawdzenie czy uzytkownik jest zalogowany przy otwarciu strony
  componentDidMount = async () => {
    this.setState({
      loading: true
  })
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.sessionToken && user.role) {
      //const { success } = AuthAPI.checkSessionTokenMocked()
      //if (success) {
        this.setState({
          user,
          isLoggedIn: true
        })
      } else {
          localStorage.removeItem('user')
      }
    
  let jobs = await JobsAPI.getJobs()
      this.setState({
          loading: false,
          jobs,
          filtered: jobs
      })  
  }
  // zeby tutaj zastosowac this.props.history, musimy uzyc Router w indeks.js, a nie tutaj oraz
  // oplesc App w withRouter HOC
  onLogin = data => {
    const user = JSON.stringify(data)
    localStorage.setItem('user', user)
    this.setState({ 
      user,
      isLoggedIn: true
    })
    this.props.history.push('/')
  }
  handleLogout = e => {
    e.preventDefault()
    localStorage.removeItem('user')
    this.setState({ 
      user: undefined,
      isLoggedIn: false
    })
    this.props.history.push('/')
  }
  searchTerms = e => {
    const keyword = e.target.value
    if (keyword !== '') {
      const list = this.state.jobs.filter(item => {
        return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      })
      this.setState({
        filtered: list,
        keyword
      })
    } else {
      this.setState({
        filtered: this.state.jobs,
        keyword
      })
    }
  }
  render() {
    const { isLoggedIn, filtered, keyword, loading } = this.state
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header>
            <h5>Job offers</h5>
          </header>
          <Navigation 
            isLoggedIn={isLoggedIn}
            handleLogout={this.handleLogout}
            onSearch={this.searchTerms}
            keyword={keyword}
          />
          <Switch>
            <Route exact path='/' render={(props) => <JobListPage loading={loading} jobs={filtered} />} />
            <Route exact path="/job/:slug" component={JobPage} />
            <Route exact path='/add-job' component={() => isLoggedIn ?
              <CreateJobPage /> :
              <Redirect to={'/login'} />}
            />
            <Route exact path='/login' component={() => isLoggedIn ?
              <Redirect to={'/'} /> :
              <LoginPage onLogin={this.onLogin} />} 
            />
            <Route exact path="/dashboard" component={() => isLoggedIn ?
                  <Dashboard /> :
                  <Redirect to={'/'}/>}
            />
            <Route exact path="/terms-of-service" component={ToS} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}
export default withRouter(App)
