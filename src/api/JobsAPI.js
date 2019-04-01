import jobs from '../data/jobs'

export default {

  getJobs: () => new Promise(resolve => {
    setTimeout(() => {
      resolve(jobs)
    }, 2000)
  }),
  getJobMocked: slug => new Promise(resolve => {
    const job = jobs.find((job) => job.slug === slug)
    setTimeout(() => resolve({
      success: job !== undefined,
      response: { data: job },
      error: job === undefined ?
        'The requested job offer does not exist or has expired.' :
        undefined
    }), 1000)
  })
}

/* export default {
  getJobs: async () => {
    const req = await NetworkService.get('/jobs')
    if (req.success) {
      return req.response.data
    } else {
      return req.error
    }
  }
} */

