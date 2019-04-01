import React, { Component} from 'react'
import styled from 'styled-components'
import JobsAPI from '../api/JobsAPI'
import ErrorBox from './ErrorBox'
import Spinner from './Spinner'

const Background = styled.div`
  width: 100%;
  height: 620px;
  background-image: url(${props => props.promoImageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > a {
    width: 60%;
  }
`
class JobPage extends Component {

  state = {
    loading: false,
    job: undefined
  }
  componentDidMount = async () => {
    this.setState({ 
        loading: true 
    })
    const { success, response, error } = await JobsAPI.getJobMocked(
      this.props.match.params.slug
    )
    if (success) {
      this.setState({
        job: response.data,
        loading: false,
        error: undefined
      })
    } else {
      this.setState({
        error,
        loading: false
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }
    if (this.state.job) {
      return (
        <Background promoImageUrl={this.state.job.promoImageUrl}>
         
        </Background>
      )
    }
    if (this.state.error) {
      return <ErrorBox label={this.state.error} />
    }
    return <div></div>
  }
}
export default JobPage