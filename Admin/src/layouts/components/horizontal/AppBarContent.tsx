// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings } = props

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {auth.user && (
        <>
          <UserDropdown settings={settings} />
        </>
      )}
    </Box>
  )
}

export default AppBarContent
