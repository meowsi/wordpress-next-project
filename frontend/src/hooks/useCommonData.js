import { getMenus } from '../services/wordpress'

const useCommonData = async (path = '') => {
  const menus = await getMenus()
  const header = menus.header
  const footer = menus.footer

  const data = {
    header: { ...header, path },
    footer
  }

  return data
}

export default useCommonData
