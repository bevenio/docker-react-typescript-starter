/* Styles */
import './loading.scss'

/* Components */
import { PageLayout } from '@/components/basic/page-layout'
import { FillAvailable } from '@/components/basic/fill-available'
import { LoadingSpinner } from '@/components/basic/loading-spinner'

const LoadingPage = function () {
  return (
    <PageLayout>
      <FillAvailable>
        <LoadingSpinner />
      </FillAvailable>
    </PageLayout>
  )
}

export { LoadingPage }
