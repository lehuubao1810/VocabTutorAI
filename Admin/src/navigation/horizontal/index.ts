// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Manage User',
      icon: 'mdi:user',
      path: '/apps/manageUser'
    },
    {
      title: 'Manage Collection',
      icon: 'mdi:collection',
      path: '/apps/manageCollection'
    },
    {
      title: 'Manage CharactersAI',
      icon: 'mdi:robot',
      path: '/apps/manageCharactersAI'
    },
  ]
}

export default navigation
