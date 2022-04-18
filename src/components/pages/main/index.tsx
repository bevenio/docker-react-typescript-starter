/* Styles */
import './main.scss'

/* Services */
import { getVariable } from '@/services/stylesheet-service'

/* Components */
import { PageLayout } from '@/components/basic/page-layout'
import { ContentWrapper } from '@/components/basic/content-wrapper'
import { ContentCard } from '@/components/basic/content-card'
import { NoiseBackground } from '@/components/basic/noise-background'

interface HackCards {
  title: string
  level: number
  route: string
}

const MainPage = function () {
  const renderHack: React.FC<HackCards> = ({ title, level, route }: HackCards) => (
    <ContentCard label={`Level ${level}`} key={`key-${title}`}>
      <h4>{title}</h4>
      <button type="button">{`Start ${route}`}</button>
    </ContentCard>
  )

  const hacks = [
    { title: 'AI', level: 3, route: '/ai' },
    { title: 'Communicator', level: 3, route: '/com' },
    { title: 'Navigator', level: 2, route: '/nav' },
  ].map(renderHack)

  return (
    <NoiseBackground color={getVariable('--color-accent-translucent')}>
      <PageLayout>
        <ContentWrapper navbar>
          <h2>Hacks</h2>
          {hacks}
        </ContentWrapper>
      </PageLayout>
    </NoiseBackground>
  )
}

export { MainPage }
