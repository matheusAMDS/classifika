import { Card } from 'antd'

import publicitycard from 'styles/publicity-card.module.css'
import { Publicity } from 'services/Publicity'

interface Props {
  publicity:Publicity
}

function daysFromTimestamp(createdAt:number):string {
  const now = Date.now()
  const daysAgo = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24))
  
  if (daysAgo === 0)
    return 'Hoje'
  else if (daysAgo === 1)
    return 'Ontem'
  else
    return `Há ${daysAgo.toString()} dias atrás`
}

const PublicityCard:React.FC<Props> = ({ publicity }) => {
  return (
    <Card
      hoverable
      className={publicitycard.card}
      cover={(
        <img 
          src={publicity.thumbnail} 
          alt="Publicity thumbnail"
        />
      )}
    >
      <p>{daysFromTimestamp(publicity.createdAt)}</p>
      <Card.Meta 
        title={publicity.title}
        description={<strong>{publicity.category}</strong>}
      />
    </Card>
  )
}

export default PublicityCard