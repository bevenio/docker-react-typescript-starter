import React from 'react'
import RouterUtils from '@/routes/router.utility'

const DemoFeatureOne = React.lazy(() =>
  import('@/feature-library/demo-one/demo-one')
)
const DemoFeatureTwo = React.lazy(() =>
  import('@/feature-library/demo-two/demo-two')
)

const route = '/demo'
const subroutes = RouterUtils.createSubroutes([
  {
    key: 'demo-one',
    path: '/demo',
    component: DemoFeatureOne,
    exact: true,
  },
  {
    key: 'demo-two',
    path: '/demo/2',
    component: DemoFeatureTwo,
    exact: true,
  },
])

export default {
  route,
  subroutes,
}
