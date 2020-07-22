import { Row, Col, Layout, Menu, Typography, Pagination, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import PublicityCard from 'components/PublicityCard'
import AppLayout from 'components/AppLayout'

import layout from 'styles/layout.module.css'
import home from 'styles/home.module.css'

import { usePublicities } from 'services/Publicity'

const { Sider, Content } = Layout
const { Title } = Typography

function mapKeyToPlural(key:string) {
  const map = new Map([
    ['Veículo', 'Veículos'],
    ['Imóvel', 'Imóveis'],
    ['Serviço', 'Serviços'],
    ['Emprego', 'Empregos'],
    ['Outro', 'Outros']
  ])

  return map.get(key)
}

const Home:React.FC = () => {
  const router = useRouter()
  const category = router.query.category as string
  const page = Number(router.query.page) || 1
  const { publicities, isLoading, error, total } = usePublicities(category, page)
  
  if (error) console.log(error)

  return (
    <AppLayout>
      <Layout className={layout.content} hasSider>
        <Sider 
          title="Categories" 
          className={home.sider}
          breakpoint="sm"
          collapsedWidth="0"
        >
          <Menu 
            mode="inline"
            theme="dark"
            className={home.menu}
            onClick={e => {
              if (e.key !== 'all')
                router.push(`/?category=${e.key}`)
              else
                router.push(`/`)
            }}
          >
            <Menu.Item key='all'>Todos</Menu.Item>
            <Menu.Item key='Veículo'>Veículos</Menu.Item>
            <Menu.Item key='Imóvel'>Imóveis</Menu.Item>
            <Menu.Item key='Serviço'>Serviços</Menu.Item>
            <Menu.Item key='Emprego'>Empregos</Menu.Item>
            <Menu.Item key='Outro'>Outros</Menu.Item>
          </Menu>
        </Sider>
        <Content className={home.publicities}>
          <Title level={2}>
            {mapKeyToPlural(category) || "Todos os anúncios"}
          </Title>
          <Row 
            gutter={[
              { xs: 4, sm: 6, md: 10, lg: 16 }, 
              { xs: 4, sm: 6, md: 10, lg: 16 }
            ]}
          >
            { isLoading ? <Spin size="large" className={home.spinner} /> : (
              publicities && (
              publicities.length === 0
                ? <strong className={home.no_publicities_message}>
                    Não há anúncios publicados.
                  </strong>
                : publicities.map((publicity) => (
                  <Link
                    key={String(publicity._id)}
                    href='/publicities/[id]' 
                    as={`/publicities/${publicity._id}`}
                  >
                    <Col xs={22} sm={17} md={16} lg={12} xl={8} >
                      <PublicityCard publicity={publicity} />
                    </Col>
                  </Link>
                ))
              )
            )}
          </Row>
          { publicities && publicities.length > 0 ? (
            <Pagination 
              current={page} 
              total={total}
              onChange={(page, _) => {
                if (category)
                  router.push(`/?category=${category}&page=${page}`)
                else 
                  router.push(`/?page=${page}`)
              }}
            />
          ) : null}
        </Content>     
      </Layout>
    </AppLayout>
  )
}

export default Home